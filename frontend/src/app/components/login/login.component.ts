// English: Login page component and form logic.
// Italiano: Componente pagina login e logica del form.
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

/**
 * English: Login page for user authentication.
 * Italiano: Pagina login per autenticazione utente.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // English: Local form state.
  // Italiano: Stato locale del form.
  email = '';
  password = '';
  error = '';
  loading = false;

  // English: Injected services for auth and navigation.
  // Italiano: Servizi iniettati per auth e navigazione.
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
