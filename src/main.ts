import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import {environment} from './app/shared/environments/environment.development';

// 🔒 Desactiva todos los console.* si está en producción
if (environment.production) {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
  console.info = () => {};
  console.debug = () => {};
}

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err)); // corregido: mostrará error si hay fallo en bootstrap
