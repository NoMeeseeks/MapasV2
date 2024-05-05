import { HttpClient, HttpHandler, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { accessToken } from "mapbox-gl";
import { environment } from "../../../environments/envitronments";

@Injectable({
    providedIn: 'root'
})
export class PlacesApiClient extends HttpClient {
    public baseUrl: string = 'https://api.mapbox.com/search/geocode/v6';

    constructor(handler: HttpHandler) {
        //nos va a permitir usar las funciones http
        super(handler);
    }

    public override get<T>(url: string, options: {
        params?: HttpParams | {
            [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
        };
    }) {

        url = this.baseUrl + url;

        return super.get<T>(url, {
            params: {
                limit: 5,
                language: 'es',
                access_token: environment.apiKey,
                ...options.params
            }
        });


    }
}