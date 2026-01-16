// English: Reusable modal for confirmations and details.
// Italiano: modal riutilizzabile per conferme e dettagli.
// English: Sections include text/state inputs and action outputs.
// Italiano: Sezioni: input di testo/stato e output per azioni.
// English: UI/UX choice: light backdrop and immediate CTA focus.
// Italiano: Scelte UI/UX: backdrop leggero e focus immediato sui CTA.
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
  // English: Modal open state.
  // Italiano: Stato di apertura della modale.
  @Input() open = false;
  // English: Main title.
  // Italiano: Titolo principale.
  @Input() title = '';
  // English: Optional description.
  // Italiano: Descrizione opzionale.
  @Input() description = '';
  // English: Confirm button text.
  // Italiano: Testo bottone conferma.
  @Input() confirmLabel = 'Confirm';
  // English: Cancel button text.
  // Italiano: Testo bottone annulla.
  @Input() cancelLabel = 'Cancel';
  // English: Confirm button variant.
  // Italiano: Variante bottone conferma.
  @Input() confirmVariant: 'primary' | 'danger' | 'secondary' = 'primary';
  // English: Disables the confirm button.
  // Italiano: Disabilita il bottone di conferma.
  @Input() confirmDisabled = false;
  // English: Shows or hides the standard footer.
  // Italiano: Mostra o nasconde il footer standard.
  @Input() showFooter = true;
  // English: Shows or hides the cancel button.
  // Italiano: Mostra o nasconde il bottone annulla.
  @Input() showCancel = true;

  // English: Confirm event.
  // Italiano: Evento di conferma.
  @Output() confirm = new EventEmitter<void>();
  // English: Cancel event.
  // Italiano: Evento di annullamento.
  @Output() cancel = new EventEmitter<void>();

  // English: Closes with ESC only when open.
  // Italiano: Chiude con ESC solo se aperta.
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open) {
      this.cancel.emit();
    }
  }

  // English: Emits confirm from the button.
  // Italiano: Emissione conferma dal bottone.
  onConfirm(): void {
    this.confirm.emit();
  }

  // English: Emits cancel from the button or backdrop.
  // Italiano: Emissione annulla dal bottone o backdrop.
  onCancel(): void {
    this.cancel.emit();
  }
}
