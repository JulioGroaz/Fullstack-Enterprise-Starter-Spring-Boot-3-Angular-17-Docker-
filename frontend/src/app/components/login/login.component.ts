// Scopo: pagina di login con form e gestione autenticazione.
// Sezioni: stato locale e submit del form.
// Scelte UI/UX: form compatto per ridurre il tempo di accesso.
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CardComponent } from '../../shared/layout/card/card.component';
import { UiButtonComponent } from '../../shared/ui/ui-button/ui-button.component';
import { UiInputComponent } from '../../shared/ui/ui-input/ui-input.component';

// Pagina login per autenticazione utente.
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, UiButtonComponent, UiInputComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Stato locale del form.
  email = '';
  password = '';
  error = '';
  loading = false;

  // Servizi per autenticazione e navigazione.
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Invia le credenziali e naviga in caso di successo.
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
        this.error = err?.error?.message || 'Login fallito';
      }
    });
  }
}
