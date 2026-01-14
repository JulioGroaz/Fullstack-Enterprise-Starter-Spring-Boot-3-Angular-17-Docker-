// English: Shell layout with navigation for protected routes.
// Italiano: Layout shell con navigazione per route protette.
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * English: Protected shell wrapper for profile and admin pages.
 * Italiano: Wrapper shell protetto per pagine profilo e admin.
 */
@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <header class="shell-header">
      <div>
        <strong>Fullstack Starter</strong>
        <div class="helper">Secure workspace</div>
      </div>
      <nav class="nav">
        <a routerLink="/profile">Profile</a>
        <a routerLink="/admin/users">Admin Users</a>
      </nav>
      <div class="actions">
        <span class="tag" *ngIf="auth.getUser() as user">{{ user.email }}</span>
        <button class="secondary" (click)="logout()">Logout</button>
      </div>
    </header>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `
})
export class ShellComponent {
  constructor(public auth: AuthService, private router: Router) {}

  /**
   * English: Logs out the user and redirects to login.
   * Italiano: Effettua logout e reindirizza al login.
   */
  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
