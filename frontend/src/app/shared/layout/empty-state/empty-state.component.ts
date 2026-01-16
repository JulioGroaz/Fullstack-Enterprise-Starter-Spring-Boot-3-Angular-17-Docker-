// English: Reusable empty state for lists and searches.
// Italiano: stato vuoto riutilizzabile per liste e ricerche.
// English: Sections include text inputs and action slot.
// Italiano: Sezioni: input testo e slot per azioni.
// English: UI/UX choice: centered message and optional CTA.
// Italiano: Scelte UI/UX: messaggio centrato e CTA opzionale.
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'empty-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.css']
})
export class EmptyStateComponent {
  // English: Main empty-state title.
  // Italiano: Titolo principale dello stato vuoto.
  @Input() title = 'No results';
  // English: Supporting description.
  // Italiano: Descrizione di supporto.
  @Input() description = '';
}
