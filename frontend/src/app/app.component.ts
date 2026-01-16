// Scopo: componente root con router outlet e toast globali.
// Sezioni: import e template minimale.
// Scelte UI/UX: toast sempre disponibili senza invadere le pagine.
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiToastComponent } from './shared/ui/ui-toast/ui-toast.component';

// Shell root dell'applicazione Angular.
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UiToastComponent],
  template: '<router-outlet /><ui-toast />'
})
export class AppComponent {}
