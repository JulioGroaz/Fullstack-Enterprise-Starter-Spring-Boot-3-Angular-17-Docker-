// English: Admin users management component.
// Italiano: Componente gestione utenti admin.
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models';

/**
 * English: Admin page to list and enable/disable users.
 * Italiano: Pagina admin per elencare e abilitare/disabilitare utenti.
 */
@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  // English: UI state for the user list and errors.
  // Italiano: Stato UI per lista utenti ed errori.
  users: User[] = [];
  error = '';

  // English: Injected service for user management APIs.
  // Italiano: Servizio iniettato per API gestione utenti.
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
