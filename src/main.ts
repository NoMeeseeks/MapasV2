import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

if (!navigator.geolocation) {
  alert('Tu navegador no soporta la Geolocalizacion')
  throw new Error('Navegador no soporta la geolocalizacion')
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
