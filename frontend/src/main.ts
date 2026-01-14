// English: Entry point that bootstraps the standalone Angular app.
// Italiano: Punto di ingresso che avvia l'app Angular standalone.
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// English: Start the application with its configuration.
// Italiano: Avvia l'applicazione con la sua configurazione.
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
