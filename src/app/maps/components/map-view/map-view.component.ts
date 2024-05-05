import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Map, Popup, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit {
  public placesServices = inject(PlacesService)
  public mapServices = inject(MapService)

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef


  ngAfterViewInit(): void {
    if (!this.placesServices.userLocation) throw Error('No hay placesService.userLocation');

    const map = new Map({
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/standard',

      center: this.placesServices.userLocation,
      zoom: 14,
      container: this.mapDivElement.nativeElement,
      pitch: 45,
      bearing: -17.6,
      antialias: true
    });

    map.on('style.load', () => {
      // Insert the layer beneath any symbol layer.
      const layers = map.getStyle().layers;

      // The 'building' layer in the Mapbox Streets
      // vector tileset contains building height data
      // from OpenStreetMap.
      map.addLayer(
        {
          'id': 'add-3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
            'fill-extrusion-color': '#aaa',

            // Use an 'interpolate' expression to
            // add a smooth transition effect to
            // the buildings as the user zooms in.
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        },

      );
    });

    const popup = new Popup()
      .setHTML('<h6> Aqui me encuentro </h6>')

    new Marker({ color: 'red' }).setLngLat(this.placesServices.userLocation)
      .setPopup(popup)
      .addTo(map)

    this.mapServices.setMap(map);
  }
}
