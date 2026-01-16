// Scopo: form utente riutilizzabile per view/edit/create.
// Sezioni: input dati, stato form e gestione submit.
// Scelte UI/UX: layout a due colonne e campi raggruppati per contesto.
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../../../models';
import { UiInputComponent } from '../../../../shared/ui/ui-input/ui-input.component';
import { UiSelectComponent, UiSelectOption } from '../../../../shared/ui/ui-select/ui-select.component';
import { UiToggleComponent } from '../../../../shared/ui/ui-toggle/ui-toggle.component';
import { UiButtonComponent } from '../../../../shared/ui/ui-button/ui-button.component';

export type UserFormMode = 'view' | 'edit' | 'create';

export interface UserFormValue {
  email: string;
  role: string;
  enabled: boolean;
  company: string;
  note: string;
}

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, UiInputComponent, UiSelectComponent, UiToggleComponent, UiButtonComponent],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnChanges {
  // Utente da visualizzare o modificare.
  @Input() user: User | null = null;
  // Modalita del form.
  @Input() mode: UserFormMode = 'view';
  // Forza sola lettura.
  @Input() readOnly = false;
  // Opzioni ruolo opzionali dal parent.
  @Input() roleOptions: UiSelectOption[] = [];

  // Evento emesso al submit valido.
  @Output() submitForm = new EventEmitter<UserFormValue>();

  // Stato locale dei campi.
  formData: UserFormValue = {
    email: '',
    role: '',
    enabled: true,
    company: '',
    note: ''
  };

  // Traccia l'invio per mostrare errori.
  submitted = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      this.formData = {
        email: this.user?.email ?? '',
        role: this.user?.roles?.[0] ?? '',
        enabled: this.user?.enabled ?? true,
        company: this.getCompanyFromEmail(this.user?.email ?? ''),
        note: ''
      };
      this.submitted = false;
    }
  }

  // Opzioni ruolo di fallback se non passate.
  get resolvedRoleOptions(): UiSelectOption[] {
    if (this.roleOptions.length) {
      return this.roleOptions;
    }
    if (this.user?.roles?.length) {
      return this.user.roles.map(role => ({ label: role, value: role }));
    }
    return [];
  }

  // Gestisce il submit, lasciando al parent la logica.
  onSubmit(form: NgForm): void {
    this.submitted = true;
    if (this.readOnly || form.invalid) {
      return;
    }
    this.submitForm.emit({ ...this.formData });
  }

  // Aggiorna lo stato enabled da toggle.
  onToggle(nextValue: boolean): void {
    this.formData.enabled = nextValue;
  }

  // Estrae un "company" dal dominio email.
  private getCompanyFromEmail(email: string): string {
    const domain = email.split('@')[1] ?? '';
    return domain.toLowerCase();
  }
}
