import { HttpClient } from '@angular/common/http';
import { Injectable, Query, inject } from '@angular/core';
import { Feature, Places } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private http = inject(HttpClient)

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
    this.isLoadingPlaces = true;
    this.http.get<Places>(`https://api.mapbox.com/search/geocode/v6/forward?q=${query}&proximity=ip&language=es&access_token=pk.eyJ1IjoiZGV2LXhhdmllciIsImEiOiJjbHV5OXRpOXgwNjUyMmlvYWdoa290NnFwIn0.XetX3TUEducu_MnsP4X3_g`)
      .subscribe(resp => {
        console.log(resp.features)
        this.isLoadingPlaces = false;
        this.places = resp.features
      })
  }
}
