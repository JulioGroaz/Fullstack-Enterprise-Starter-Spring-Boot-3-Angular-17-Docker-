// Scopo: pagina principale di gestione utenti con filtri e tabella.
// Sezioni: stato pagina, caricamento dati, filtri e azioni.
// Scelte UI/UX: feedback con toast e conferma per azioni distruttive.
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { User } from '../../../../models';
import { UserService } from '../../../../services/user.service';
import { UiToastService } from '../../../../shared/ui/ui-toast/ui-toast.service';
import { PageHeaderComponent } from '../../../../shared/layout/page-header/page-header.component';
import { CardComponent } from '../../../../shared/layout/card/card.component';
import { EmptyStateComponent } from '../../../../shared/layout/empty-state/empty-state.component';
import { UiButtonComponent } from '../../../../shared/ui/ui-button/ui-button.component';
import { UiModalComponent } from '../../../../shared/ui/ui-modal/ui-modal.component';
import { UiSelectOption } from '../../../../shared/ui/ui-select/ui-select.component';
import { UserFiltersComponent, UserFilterState } from '../../components/user-filters/user-filters.component';
import { UserTableComponent, UserToggleEvent } from '../../components/user-table/user-table.component';
import { UserFormComponent } from '../../components/user-form/user-form.component';

@Component({
  selector: 'users-page',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    CardComponent,
    EmptyStateComponent,
    UiButtonComponent,
    UiModalComponent,
    UserFiltersComponent,
    UserTableComponent,
    UserFormComponent
  ],
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {
  // Lista completa utenti dal backend.
  users: User[] = [];
  // Lista filtrata da mostrare.
  filteredUsers: User[] = [];
  // Stato di caricamento globale.
  loading = false;
  // Messaggio errore pagina.
  error = '';

  // Stato filtri attivi.
  filters: UserFilterState = {
    search: '',
    status: 'all',
    role: 'all',
    company: 'all'
  };

  // Opzioni dinamiche per i select.
  roleOptions: UiSelectOption[] = [{ label: 'Tutti i ruoli', value: 'all' }];
  companyOptions: UiSelectOption[] = [{ label: 'Tutte le aziende', value: 'all' }];

  // Stato conferma toggle.
  confirmOpen = false;
  pendingToggle: UserToggleEvent | null = null;

  // Stato modale dettaglio.
  detailOpen = false;
  detailMode: 'view' | 'edit' = 'view';
  selectedUser: User | null = null;

  constructor(private userService: UserService, private toastService: UiToastService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Carica la lista utenti dal backend.
  loadUsers(): void {
    this.loading = true;
    this.error = '';
    this.userService
      .adminListUsers()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: users => {
          this.users = users;
          this.syncOptions(users);
          this.applyFilters();
        },
        error: err => {
          this.error = err?.error?.message || 'Errore nel caricamento utenti';
          this.toastService.error('Caricamento fallito', this.error);
        }
      });
  }

  // Aggiorna i filtri quando cambiano dal child.
  onFiltersChange(filters: UserFilterState): void {
    this.filters = filters;
    this.applyFilters();
  }

  // Ripristina filtri base dalla UI.
  resetFilters(): void {
    this.filters = { search: '', status: 'all', role: 'all', company: 'all' };
    this.applyFilters();
  }

  // Applica i filtri alla lista utenti.
  applyFilters(): void {
    const search = this.filters.search.trim().toLowerCase();
    this.filteredUsers = this.users.filter(user => {
      const matchesStatus =
        this.filters.status === 'all' ||
        (this.filters.status === 'enabled' && user.enabled) ||
        (this.filters.status === 'disabled' && !user.enabled);

      const matchesRole =
        this.filters.role === 'all' || user.roles.some(role => role === this.filters.role);

      const company = this.getCompanyFromEmail(user.email);
      const matchesCompany = this.filters.company === 'all' || company === this.filters.company;

      const matchesSearch =
        !search ||
        user.email.toLowerCase().includes(search) ||
        user.roles.some(role => role.toLowerCase().includes(search)) ||
        company.includes(search);

      return matchesStatus && matchesRole && matchesCompany && matchesSearch;
    });
  }

  // Richiesta toggle stato: apre conferma.
  onToggleRequest(event: UserToggleEvent): void {
    this.pendingToggle = event;
    this.confirmOpen = true;
  }

  // Conferma toggle stato e chiama il backend.
  confirmToggle(): void {
    if (!this.pendingToggle) {
      return;
    }
    const { user, nextEnabled } = this.pendingToggle;
    const action = nextEnabled ? this.userService.adminEnable(user.id) : this.userService.adminDisable(user.id);
    action.subscribe({
      next: updated => {
        this.users = this.users.map(item => (item.id === updated.id ? updated : item));
        this.applyFilters();
        const message = nextEnabled ? 'Utente abilitato' : 'Utente disabilitato';
        this.toastService.success('Operazione completata', message);
      },
      error: err => {
        const message = err?.error?.message || 'Operazione non riuscita';
        this.toastService.error('Errore stato utente', message);
      }
    });
    this.cancelToggle();
  }

  // Chiude la modale di conferma.
  cancelToggle(): void {
    this.confirmOpen = false;
    this.pendingToggle = null;
  }

  // Apre la modale dettaglio.
  openDetail(user: User, mode: 'view' | 'edit'): void {
    this.selectedUser = user;
    this.detailMode = mode;
    this.detailOpen = true;
  }

  // Chiude la modale dettaglio.
  closeDetail(): void {
    this.detailOpen = false;
    this.selectedUser = null;
  }

  // Aggiorna le opzioni dei filtri in base ai dati.
  private syncOptions(users: User[]): void {
    const roles = new Set<string>();
    const companies = new Set<string>();
    users.forEach(user => {
      user.roles.forEach(role => roles.add(role));
      companies.add(this.getCompanyFromEmail(user.email));
    });

    this.roleOptions = [
      { label: 'Tutti i ruoli', value: 'all' },
      ...Array.from(roles).map(role => ({ label: this.roleLabel(role), value: role }))
    ];

    this.companyOptions = [
      { label: 'Tutte le aziende', value: 'all' },
      ...Array.from(companies)
        .filter(Boolean)
        .sort()
        .map(company => ({ label: company, value: company }))
    ];
  }

  // Etichetta ruolo coerente con i badge.
  private roleLabel(role: string): string {
    const normalized = role.replace('ROLE_', '').replace('_', ' ');
    const upper = normalized.toUpperCase();
    if (upper.includes('ADMIN')) {
      return 'Manager';
    }
    if (upper.includes('SALES')) {
      return 'Sales';
    }
    if (upper.includes('VIEW')) {
      return 'Viewer';
    }
    return normalized.charAt(0).toUpperCase() + normalized.slice(1).toLowerCase();
  }

  // Estrae il dominio dalla email.
  private getCompanyFromEmail(email: string): string {
    return (email.split('@')[1] ?? '').toLowerCase();
  }
}
