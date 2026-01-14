// English: Profile page component for the current user.
// Italiano: Componente pagina profilo per l'utente corrente.
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models';

/**
 * English: Shows the authenticated user's profile data.
 * Italiano: Mostra i dati profilo dell'utente autenticato.
 */
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h2>Your profile</h2>
      <div *ngIf="user; else loading">
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Roles:</strong> {{ user.roles.join(', ') }}</p>
        <p><strong>Status:</strong> {{ user.enabled ? 'Enabled' : 'Disabled' }}</p>
      </div>
      <ng-template #loading>
        <p class="helper">Loading profile...</p>
      </ng-template>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private userService: UserService) {}

  /**
   * English: Loads the current user profile on init.
   * Italiano: Carica il profilo utente all'avvio.
   */
  ngOnInit(): void {
    this.userService.getMe().subscribe(user => {
      this.user = user;
    });
  }
}
