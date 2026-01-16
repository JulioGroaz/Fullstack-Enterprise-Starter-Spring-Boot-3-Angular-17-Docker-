// Scopo: modal riutilizzabile per conferme e dettagli.
// Sezioni: input di testo/stato e output per azioni.
// Scelte UI/UX: backdrop leggero e focus immediato sui CTA.
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { UiButtonComponent } from '../ui-button/ui-button.component';

@Component({
  selector: 'ui-modal',
  standalone: true,
  imports: [CommonModule, UiButtonComponent],
  templateUrl: './ui-modal.component.html',
  styleUrls: ['./ui-modal.component.css']
})
export class UiModalComponent {
  // Stato di apertura della modale.
  @Input() open = false;
  // Titolo principale.
  @Input() title = '';
  // Descrizione opzionale.
  @Input() description = '';
  // Testo bottone conferma.
  @Input() confirmLabel = 'Conferma';
  // Testo bottone annulla.
  @Input() cancelLabel = 'Annulla';
  // Variante bottone conferma.
  @Input() confirmVariant: 'primary' | 'danger' | 'secondary' = 'primary';
  // Disabilita il bottone di conferma.
  @Input() confirmDisabled = false;
  // Mostra o nasconde il footer standard.
  @Input() showFooter = true;
  // Mostra o nasconde il bottone annulla.
  @Input() showCancel = true;

  // Evento di conferma.
  @Output() confirm = new EventEmitter<void>();
  // Evento di annullamento.
  @Output() cancel = new EventEmitter<void>();

  // Chiude con ESC solo se aperta.
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open) {
      this.cancel.emit();
    }
  }

  // Emissione conferma dal bottone.
  onConfirm(): void {
    this.confirm.emit();
  }

  // Emissione annulla dal bottone o backdrop.
  onCancel(): void {
    this.cancel.emit();
  }
}
