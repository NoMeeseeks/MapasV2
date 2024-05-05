import { HttpClient } from '@angular/common/http';
import { Injectable, Query, inject } from '@angular/core';
import { Feature, Places } from '../interfaces/places';
import { PlacesApiClient } from '../api/placesApi.Client';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private http = inject(PlacesApiClient)

  public userLocation: [number, number] | undefined;
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation
  }

  constructor() { this.getUserLocaltion() }

  public async getUserLocaltion(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (args) => {
          this.userLocation = [args.coords.longitude, args.coords.latitude]
          resolve(this.userLocation)
        },
        (erro) => {
          alert('No se pudo obtener la geolocalizacion');
          console.log(erro);
          reject();
        }
      )
    })
  }

  getPlacesByQuery(query: string = '') {
    if (!this.userLocation) { return }
    this.isLoadingPlaces = true;
    this.http.get<Places>(`/forward?q=${query}`, {
      params: {
        proximity: this.userLocation.join(',')
      }
    })
      .subscribe(resp => {
        console.log(resp.features)
        this.isLoadingPlaces = false;
        this.places = resp.features
      })
  }
}
