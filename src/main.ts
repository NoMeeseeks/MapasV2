import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2LXhhdmllciIsImEiOiJjbHV5OXRpOXgwNjUyMmlvYWdoa290NnFwIn0.XetX3TUEducu_MnsP4X3_g';

if (!navigator.geolocation) {
  alert('Tu navegador no soporta la Geolocalizacion')
  throw new Error('Navegador no soporta la geolocalizacion')
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
