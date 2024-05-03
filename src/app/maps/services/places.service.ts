import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation: [number, number] | undefined;

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

}
