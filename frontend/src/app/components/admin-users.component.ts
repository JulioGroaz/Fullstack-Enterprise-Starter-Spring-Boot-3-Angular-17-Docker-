// English: Admin users management component.
// Italiano: Componente gestione utenti admin.
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models';

/**
 * English: Admin page to list and enable/disable users.
 * Italiano: Pagina admin per elencare e abilitare/disabilitare utenti.
 */
@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h2>Admin users</h2>
      <p class="helper">Manage user access and status.</p>
      <div *ngIf="error" class="error">{{ error }}</div>
      <table class="table" *ngIf="users.length">
        <thead>
          <tr>
            <th>Email</th>
            <th>Roles</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of users">
            <td>{{ user.email }}</td>
            <td>{{ user.roles.join(', ') }}</td>
            <td>{{ user.enabled ? 'Enabled' : 'Disabled' }}</td>
            <td>
              <button class="secondary" (click)="toggleUser(user)">
                {{ user.enabled ? 'Disable' : 'Enable' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p *ngIf="!users.length" class="helper">No users found.</p>
    </div>
  `
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  error = '';

  constructor(private userService: UserService) {}

  /**
   * English: Loads users when the component initializes.
   * Italiano: Carica gli utenti quando il componente si inizializza.
   */
  ngOnInit(): void {
    this.loadUsers();
  }

  /**
   * English: Requests the user list from the backend.
   * Italiano: Richiede la lista utenti dal backend.
   */
  loadUsers(): void {
    this.userService.adminListUsers().subscribe({
      next: users => {
        this.users = users;
      },
      error: err => {
        this.error = err?.error?.message || 'Failed to load users';
      }
    });
  }

  /**
   * English: Toggles user enabled status.
   * Italiano: Alterna lo stato enabled dell'utente.
   */
  toggleUser(user: User): void {
    const action = user.enabled ? this.userService.adminDisable(user.id) : this.userService.adminEnable(user.id);
    action.subscribe({
      next: updated => {
        this.users = this.users.map(item => (item.id === updated.id ? updated : item));
      },
      error: err => {
        this.error = err?.error?.message || 'Failed to update user';
      }
    });
  }
}
