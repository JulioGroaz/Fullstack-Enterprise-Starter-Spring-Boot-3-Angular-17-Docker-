// Scopo: pannello filtri per la lista utenti.
// Sezioni: input di stato, opzioni e gestione aggiornamenti.
// Scelte UI/UX: filtri compatti con reset rapido.
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiInputComponent } from '../../../../shared/ui/ui-input/ui-input.component';
import { UiSelectComponent, UiSelectOption } from '../../../../shared/ui/ui-select/ui-select.component';
import { UiButtonComponent } from '../../../../shared/ui/ui-button/ui-button.component';

export interface UserFilterState {
  search: string;
  status: 'all' | 'enabled' | 'disabled';
  role: string;
  company: string;
}

const defaultFilters: UserFilterState = {
  search: '',
  status: 'all',
  role: 'all',
  company: 'all'
};

@Component({
  selector: 'user-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, UiInputComponent, UiSelectComponent, UiButtonComponent],
  templateUrl: './user-filters.component.html',
  styleUrls: ['./user-filters.component.css']
})
export class UserFiltersComponent implements OnChanges {
  // Stato filtri in ingresso dal parent.
  @Input() filters: UserFilterState = { ...defaultFilters };
  // Opzioni dinamiche per ruoli.
  @Input() roleOptions: UiSelectOption[] = [];
  // Opzioni dinamiche per company.
  @Input() companyOptions: UiSelectOption[] = [];

  // Evento emesso ad ogni variazione filtri.
  @Output() filtersChange = new EventEmitter<UserFilterState>();
  // Evento separato per il reset esplicito.
  @Output() reset = new EventEmitter<void>();

  // Stato locale per evitare mutazioni dirette dell'input.
  localFilters: UserFilterState = { ...defaultFilters };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters']) {
      this.localFilters = { ...this.filters };
    }
  }

  // Propaga i filtri aggiornati verso il parent.
  emitFilters(): void {
    this.filtersChange.emit({ ...this.localFilters });
  }

  // Ripristina i filtri di default.
  resetFilters(): void {
    this.localFilters = { ...defaultFilters };
    this.filtersChange.emit({ ...this.localFilters });
    this.reset.emit();
  }

  // Opzioni statiche per stato attivazione.
  get statusOptions(): UiSelectOption[] {
    return [
      { label: 'Tutti gli stati', value: 'all' },
      { label: 'Attivi', value: 'enabled' },
      { label: 'Disabilitati', value: 'disabled' }
    ];
  }
}
