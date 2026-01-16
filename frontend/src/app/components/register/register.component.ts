// English: Registration page with user form and state handling.
// Italiano: pagina di registrazione utente con form e gestione stato.
// English: Sections include local state and form submit.
// Italiano: Sezioni: stato locale e submit del form.
// English: UI/UX choice: compact form for fast registration.
// Italiano: Scelte UI/UX: form compatto per registrazione rapida.
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CardComponent } from '../../shared/layout/card/card.component';
import { UiButtonComponent } from '../../shared/ui/ui-button/ui-button.component';
import { UiInputComponent } from '../../shared/ui/ui-input/ui-input.component';

// English: Registration page for new users.
// Italiano: Pagina registrazione per nuovi utenti.
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CardComponent, UiButtonComponent, UiInputComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // English: Local form state.
  // Italiano: Stato locale del form.
  email = '';
  password = '';
  error = '';
  loading = false;

  // English: Services for registration and navigation.
  // Italiano: Servizi per registrazione e navigazione.
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * English: Submits registration and navigates on success.
   * Italiano: Invia la registrazione e naviga in caso di successo.
   */
  onSubmit(): void {
    this.error = '';
    this.loading = true;
    this.authService.register(this.email, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('/profile');
      },
      error: err => {
        this.loading = false;
        this.error = err?.error?.message || 'Registrazione fallita';
      }
    });
  }
}
