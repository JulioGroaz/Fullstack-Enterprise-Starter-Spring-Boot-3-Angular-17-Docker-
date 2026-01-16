// English: Login page with form and authentication handling.
// Italiano: pagina di login con form e gestione autenticazione.
// English: Sections include local state and form submit.
// Italiano: Sezioni: stato locale e submit del form.
// English: UI/UX choice: compact form to reduce access time.
// Italiano: Scelte UI/UX: form compatto per ridurre il tempo di accesso.
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CardComponent } from '../../shared/layout/card/card.component';
import { UiButtonComponent } from '../../shared/ui/ui-button/ui-button.component';
import { UiInputComponent } from '../../shared/ui/ui-input/ui-input.component';

// English: Login page for user authentication.
// Italiano: Pagina login per autenticazione utente.
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CardComponent, UiButtonComponent, UiInputComponent],
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

  // English: Services for authentication and navigation.
  // Italiano: Servizi per autenticazione e navigazione.
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * English: Sends credentials and navigates on success.
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
