// Scopo: toggle booleano riutilizzabile per stati on/off.
// Sezioni: input di stato, output di cambio e gestione id.
// Scelte UI/UX: switch compatto con focus evidente.
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

let toggleIdCounter = 0;

@Component({
  selector: 'ui-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-toggle.component.html',
  styleUrls: ['./ui-toggle.component.css']
})
export class UiToggleComponent {
  // Stato attuale del toggle.
  @Input() checked = false;
  // Disabilitazione del controllo.
  @Input() disabled = false;
  // Etichetta testuale opzionale.
  @Input() label = '';
  // Etichetta aria per accessibilita.
  @Input() ariaLabel = '';

  // Evento emesso quando si tenta un cambio stato.
  @Output() changed = new EventEmitter<boolean>();

  // Id unico per associare label e input.
  toggleId = `ui-toggle-${toggleIdCounter++}`;

  // Gestisce il cambio senza mutare lo stato internamente.
  onToggle(event: Event): void {
    const input = event.target as HTMLInputElement;
    const nextValue = input.checked;
    // Ripristina lo stato finche il parent non conferma.
    input.checked = this.checked;
    this.changed.emit(nextValue);
  }
}
