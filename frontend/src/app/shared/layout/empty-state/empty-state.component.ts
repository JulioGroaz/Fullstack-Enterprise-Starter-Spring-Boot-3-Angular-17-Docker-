// Scopo: stato vuoto riutilizzabile per liste e ricerche.
// Sezioni: input testo e slot per azioni.
// Scelte UI/UX: messaggio centrato e CTA opzionale.
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
  // Titolo principale dello stato vuoto.
  @Input() title = 'Nessun risultato';
  // Descrizione di supporto.
  @Input() description = '';
}
