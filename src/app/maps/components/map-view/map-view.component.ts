import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { PlacesService } from '../../services';
import { Map } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit {
  public placesServices = inject(PlacesService)

  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  ngAfterViewInit(): void {
    if (!this.placesServices.userLocation) throw Error('No hay placesService.userLocation');

    new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/light-v12', // style URL
      center: this.placesServices.userLocation,
      zoom: 14,
    });
  }
}
