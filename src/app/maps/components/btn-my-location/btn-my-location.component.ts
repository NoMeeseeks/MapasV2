import { Component, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.css'
})
export class BtnMyLocationComponent {
  public placesServices = inject(PlacesService)
  public mapServices = inject(MapService)
  goToMyLocation() {
    if (!this.placesServices.isUserLocationReady) { return }
    if (!this.mapServices.isMapReady) { return }

    this.mapServices.flyTo(this.placesServices.userLocation!)
  }
}
