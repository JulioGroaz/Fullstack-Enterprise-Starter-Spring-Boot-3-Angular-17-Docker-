// English: Root component that hosts the router outlet.
// Italiano: Componente root che ospita il router outlet.
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * English: Root shell of the Angular application.
 * Italiano: Shell root dell'applicazione Angular.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />'
})
export class AppComponent {}
