// English: Filters panel for the users list.
// Italiano: pannello filtri per la lista utenti.
// English: Sections include state inputs, options, and update handling.
// Italiano: Sezioni: input di stato, opzioni e gestione aggiornamenti.
// English: UI/UX choice: compact filters with quick reset.
// Italiano: Scelte UI/UX: filtri compatti con reset rapido.
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
  // English: Filter state received from parent.
  // Italiano: Stato filtri in ingresso dal parent.
  @Input() filters: UserFilterState = { ...defaultFilters };
  // English: Dynamic role options.
  // Italiano: Opzioni dinamiche per ruoli.
  @Input() roleOptions: UiSelectOption[] = [];
  // English: Dynamic company options.
  // Italiano: Opzioni dinamiche per company.
  @Input() companyOptions: UiSelectOption[] = [];

  // English: Event emitted on each filter change.
  // Italiano: Evento emesso ad ogni variazione filtri.
  @Output() filtersChange = new EventEmitter<UserFilterState>();
  // English: Separate event for explicit reset.
  // Italiano: Evento separato per il reset esplicito.
  @Output() reset = new EventEmitter<void>();

  // English: Local state to avoid direct input mutations.
  // Italiano: Stato locale per evitare mutazioni dirette dell'input.
  localFilters: UserFilterState = { ...defaultFilters };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters']) {
      this.localFilters = { ...this.filters };
    }
  }

  // English: Propagates updated filters to the parent.
  // Italiano: Propaga i filtri aggiornati verso il parent.
  emitFilters(): void {
    this.filtersChange.emit({ ...this.localFilters });
  }

  // English: Resets filters to defaults.
  // Italiano: Ripristina i filtri di default.
  resetFilters(): void {
    this.localFilters = { ...defaultFilters };
    this.filtersChange.emit({ ...this.localFilters });
    this.reset.emit();
  }

  // English: Static options for activation status.
  // Italiano: Opzioni statiche per stato attivazione.
  get statusOptions(): UiSelectOption[] {
    return [
      { label: 'All statuses', value: 'all' },
      { label: 'Active', value: 'enabled' },
      { label: 'Disabled', value: 'disabled' }
    ];
  }
}
