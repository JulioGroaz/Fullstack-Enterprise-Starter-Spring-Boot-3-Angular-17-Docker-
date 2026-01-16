// Scopo: badge riutilizzabile per ruoli e stati.
// Sezioni: input di testo/tono e classe calcolata.
// Scelte UI/UX: colori chiari per distinguere rapidamente lo stato.
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-badge.component.html',
  styleUrls: ['./ui-badge.component.css']
})
export class UiBadgeComponent {
  // Testo visibile nel badge.
  @Input() label = '';
  // Tono cromatico per differenziare lo stato.
  @Input() tone: 'neutral' | 'success' | 'warning' | 'danger' | 'info' = 'neutral';
  // Dimensione del badge.
  @Input() size: 'sm' | 'md' = 'sm';

  // Classi calcolate in base a tono e dimensione.
  get badgeClasses(): string[] {
    return [
      'ui-badge',
      `ui-badge--${this.tone}`,
      `ui-badge--${this.size}`
    ];
  }
}
