// Scopo: input testuale riutilizzabile con label, helper ed errori.
// Sezioni: input di configurazione e implementazione ControlValueAccessor.
// Scelte UI/UX: layout verticale, errori evidenti ma discreti.
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let inputIdCounter = 0;

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-input.component.html',
  styleUrls: ['./ui-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: UiInputComponent,
      multi: true
    }
  ]
})
export class UiInputComponent implements ControlValueAccessor {
  // Etichetta principale dell'input.
  @Input() label = '';
  // Placeholder per guidare la compilazione.
  @Input() placeholder = '';
  // Tipo dell'input quando non multiline.
  @Input() type: 'text' | 'email' | 'password' | 'search' = 'text';
  // Messaggio di aiuto sotto il campo.
  @Input() helper = '';
  // Messaggio di errore da mostrare.
  @Input() error = '';
  // Indica se il campo e obbligatorio.
  @Input() required = false;
  // Abilita textarea al posto dell'input.
  @Input() multiline = false;
  // Righe della textarea.
  @Input() rows = 3;
  // Attributo autocomplete del browser.
  @Input() autocomplete = '';
  // Id personalizzato per label e input.
  @Input() inputId = '';
  // Attributo aria-label quando serve accessibilita extra.
  @Input() ariaLabel = '';
  // Stato di sola lettura.
  @Input() readonly = false;
  // Disabilitazione dal parent (compatibile con CVA).
  @Input()
  set disabled(value: boolean) {
    this.setDisabledState(value);
  }

  // Valore corrente gestito dal CVA.
  value = '';
  // Stato di disabilitazione interno.
  isDisabled = false;

  // Gestori registrati da Angular Forms.
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  // Id calcolato se non fornito.
  get resolvedId(): string {
    if (!this.inputId) {
      this.inputId = `ui-input-${inputIdCounter++}`;
    }
    return this.inputId;
  }

  // Aggiorna il valore dal form.
  writeValue(value: string | null): void {
    this.value = value ?? '';
  }

  // Registra il callback di cambio.
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  // Registra il callback di touch.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Aggiorna lo stato di disabilitazione.
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // Gestisce input e propaga il valore.
  onInput(value: string): void {
    this.value = value;
    this.onChange(value);
  }

  // Notifica il blur per i controlli form.
  onBlur(): void {
    this.onTouched();
  }
}
