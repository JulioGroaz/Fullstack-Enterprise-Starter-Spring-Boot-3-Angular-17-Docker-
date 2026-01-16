// Scopo: pulsante riutilizzabile con varianti e stato di caricamento.
// Sezioni: input di stile/comportamento e helper per classi/stato.
// Scelte UI/UX: varianti visive chiare e feedback loading non invasivo.
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-button.component.html',
  styleUrls: ['./ui-button.component.css']
})
export class UiButtonComponent {
  // Variante visiva del bottone.
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'ghost' = 'primary';
  // Dimensione per densita diverse.
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  // Stato di caricamento per feedback immediato.
  @Input() loading = false;
  // Disabilitazione esplicita dal chiamante.
  @Input() disabled = false;
  // Tipo HTML del bottone.
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  // Etichetta aria alternativa quando il contenuto non e testuale.
  @Input() ariaLabel = '';

  // Stato effettivo di disabilitazione.
  get isDisabled(): boolean {
    return this.disabled || this.loading;
  }

  // Classi calcolate per varianti e dimensioni.
  get buttonClasses(): string[] {
    return [
      'ui-button',
      `ui-button--${this.variant}`,
      `ui-button--${this.size}`,
      this.loading ? 'is-loading' : ''
    ].filter(Boolean);
  }
}
