// English: Main user management page with filters and table.
// Italiano: pagina principale di gestione utenti con filtri e tabella.
// English: Sections include page state, data loading, filters, and actions.
// Italiano: Sezioni: stato pagina, caricamento dati, filtri e azioni.
// English: UI/UX choice: toast feedback and confirmation for destructive actions.
// Italiano: Scelte UI/UX: feedback con toast e conferma per azioni distruttive.
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
  // English: Full user list from backend.
  // Italiano: Lista completa utenti dal backend.
  users: User[] = [];
  // English: Filtered list to display.
  // Italiano: Lista filtrata da mostrare.
  filteredUsers: User[] = [];
  // English: Global loading state.
  // Italiano: Stato di caricamento globale.
  loading = false;
  // English: Page error message.
  // Italiano: Messaggio errore pagina.
  error = '';

  // English: Active filter state.
  // Italiano: Stato filtri attivi.
  filters: UserFilterState = {
    search: '',
    status: 'all',
    role: 'all',
    company: 'all'
  };

  // English: Dynamic select options.
  // Italiano: Opzioni dinamiche per i select.
  roleOptions: UiSelectOption[] = [{ label: 'All roles', value: 'all' }];
  companyOptions: UiSelectOption[] = [{ label: 'All companies', value: 'all' }];

  // English: Toggle confirmation state.
  // Italiano: Stato conferma toggle.
  confirmOpen = false;
  pendingToggle: UserToggleEvent | null = null;

  // English: Detail modal state.
  // Italiano: Stato modale dettaglio.
  detailOpen = false;
  detailMode: 'view' | 'edit' = 'view';
  selectedUser: User | null = null;

  constructor(private userService: UserService, private toastService: UiToastService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // English: Loads the user list from the backend.
  // Italiano: Carica la lista utenti dal backend.
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
          this.error = err?.error?.message || 'Failed to load users';
          this.toastService.error('Load failed', this.error);
        }
      });
  }

  // English: Updates filters when the child emits changes.
  // Italiano: Aggiorna i filtri quando cambiano dal child.
  onFiltersChange(filters: UserFilterState): void {
    this.filters = filters;
    this.applyFilters();
  }

  // English: Resets filters to defaults from the UI.
  // Italiano: Ripristina filtri base dalla UI.
  resetFilters(): void {
    this.filters = { search: '', status: 'all', role: 'all', company: 'all' };
    this.applyFilters();
  }

  // English: Applies filters to the user list.
  // Italiano: Applica i filtri alla lista utenti.
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

  // English: Status toggle request opens confirmation.
  // Italiano: Richiesta toggle stato: apre conferma.
  onToggleRequest(event: UserToggleEvent): void {
    this.pendingToggle = event;
    this.confirmOpen = true;
  }

  // English: Confirms status toggle and calls the backend.
  // Italiano: Conferma toggle stato e chiama il backend.
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
        const message = nextEnabled ? 'User enabled' : 'User disabled';
        this.toastService.success('Update completed', message);
      },
      error: err => {
        const message = err?.error?.message || 'Action failed';
        this.toastService.error('User status error', message);
      }
    });
    this.cancelToggle();
  }

  // English: Closes the confirmation modal.
  // Italiano: Chiude la modale di conferma.
  cancelToggle(): void {
    this.confirmOpen = false;
    this.pendingToggle = null;
  }

  // English: Opens the detail modal.
  // Italiano: Apre la modale dettaglio.
  openDetail(user: User, mode: 'view' | 'edit'): void {
    this.selectedUser = user;
    this.detailMode = mode;
    this.detailOpen = true;
  }

  // English: Closes the detail modal.
  // Italiano: Chiude la modale dettaglio.
  closeDetail(): void {
    this.detailOpen = false;
    this.selectedUser = null;
  }

  // English: Updates filter options based on data.
  // Italiano: Aggiorna le opzioni dei filtri in base ai dati.
  private syncOptions(users: User[]): void {
    const roles = new Set<string>();
    const companies = new Set<string>();
    users.forEach(user => {
      user.roles.forEach(role => roles.add(role));
      companies.add(this.getCompanyFromEmail(user.email));
    });

    this.roleOptions = [
      { label: 'All roles', value: 'all' },
      ...Array.from(roles).map(role => ({ label: this.roleLabel(role), value: role }))
    ];

    this.companyOptions = [
      { label: 'All companies', value: 'all' },
      ...Array.from(companies)
        .filter(Boolean)
        .sort()
        .map(company => ({ label: company, value: company }))
    ];
  }

  // English: Role label consistent with badges.
  // Italiano: Etichetta ruolo coerente con i badge.
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

  // English: Extracts domain from email.
  // Italiano: Estrae il dominio dalla email.
  private getCompanyFromEmail(email: string): string {
    return (email.split('@')[1] ?? '').toLowerCase();
  }
}
