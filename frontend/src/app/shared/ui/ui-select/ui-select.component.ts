// Scopo: select riutilizzabile con label e gestione errori.
// Sezioni: input opzioni e implementazione ControlValueAccessor.
// Scelte UI/UX: placeholder chiaro e focus evidente.
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface UiSelectOption {
  label: string;
  value: string;
}

let selectIdCounter = 0;

@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-select.component.html',
  styleUrls: ['./ui-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: UiSelectComponent,
      multi: true
    }
  ]
})
export class UiSelectComponent implements ControlValueAccessor {
  // Etichetta principale del select.
  @Input() label = '';
  // Placeholder iniziale non selezionabile.
  @Input() placeholder = 'Seleziona';
  // Lista delle opzioni da mostrare.
  @Input() options: UiSelectOption[] = [];
  // Messaggio helper opzionale.
  @Input() helper = '';
  // Messaggio di errore opzionale.
  @Input() error = '';
  // Indica se il campo e obbligatorio.
  @Input() required = false;
  // Id personalizzato per label e select.
  @Input() selectId = '';
  // Etichetta aria per accessibilita.
  @Input() ariaLabel = '';
  // Disabilitazione dal parent (compatibile con CVA).
  @Input()
  set disabled(value: boolean) {
    this.setDisabledState(value);
  }

  // Valore corrente controllato dal CVA.
  value = '';
  // Stato di disabilitazione interno.
  isDisabled = false;

  // Gestori registrati da Angular Forms.
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  // Id calcolato se non fornito.
  get resolvedId(): string {
    if (!this.selectId) {
      this.selectId = `ui-select-${selectIdCounter++}`;
    }
    return this.selectId;
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

  // Gestisce il cambio selezione.
  onSelect(value: string): void {
    this.value = value;
    this.onChange(value);
  }

  // Notifica il blur per i controlli form.
  onBlur(): void {
    this.onTouched();
  }
}
