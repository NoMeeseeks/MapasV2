import { HttpClient, HttpHandler, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { accessToken } from "mapbox-gl";
import { environment } from "../../../environments/envitronments";

@Injectable({
    providedIn: 'root'
})
export class DirectionsApiClient extends HttpClient {
    public baseUrl: string = 'https://api.mapbox.com/directions/v5/mapbox/driving';

    constructor(handler: HttpHandler) {
        //nos va a permitir usar las funciones http
        super(handler);
    }

    public override get<T>(url: string) {

        url = this.baseUrl + url;

        return super.get<T>(url, {
            params: {
                alternatives: false,
                geometries: 'geojson',
                language: 'es',
                overview: 'simplified',
                steps: false,
                access_token: environment.apiKey
            }
        });

    }
}