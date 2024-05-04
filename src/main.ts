import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2LXhhdmllciIsImEiOiJjbHV5YTF0aTIwdGc0MnFvOHB5aTAwcm93In0.qq6YgbiqrWBeW2oO9xvhbg';

if (!navigator.geolocation) {
  alert('Tu navegador no soporta la Geolocalizacion')
  throw new Error('Navegador no soporta la geolocalizacion')
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
