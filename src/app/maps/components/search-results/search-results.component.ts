import { Component, inject } from '@angular/core';
import { PlacesService } from '../../services';
import { Feature, Properties } from '../../interfaces/places';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {
  private placesService = inject(PlacesService)
  private mapService = inject(MapService)

  public selectedId: string = '';

  get isLoadingPlaces(): boolean {
    return this.placesService.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.placesService.places;
  }

  flyTo(place: Feature) {
    this.selectedId = place.id
    this.mapService.flyTo([place.properties.coordinates.longitude, place.properties.coordinates.latitude])
  }
}
