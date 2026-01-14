// English: Login page component and form logic.
// Italiano: Componente pagina login e logica del form.
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * English: Login page for user authentication.
 * Italiano: Pagina login per autenticazione utente.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card auth-card">
      <h1>Welcome back</h1>
      <p class="helper">Sign in to reach your workspace.</p>
      <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
        <div class="field">
          <label>Email</label>
          <input type="email" name="email" [(ngModel)]="email" required />
        </div>
        <div class="field">
          <label>Password</label>
          <input type="password" name="password" [(ngModel)]="password" required />
        </div>
        <button type="submit" [disabled]="loginForm.invalid || loading">Sign in</button>
      </form>
      <div class="error" *ngIf="error">{{ error }}</div>
    </div>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * English: Submits login credentials and navigates on success.
   * Italiano: Invia le credenziali e naviga in caso di successo.
   */
  onSubmit(): void {
    this.error = '';
    this.loading = true;
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('/profile');
      },
      error: err => {
        this.loading = false;
        this.error = err?.error?.message || 'Login failed';
      }
    });
  }
}
