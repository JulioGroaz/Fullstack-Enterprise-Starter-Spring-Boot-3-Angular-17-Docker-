// English: Shell layout with navigation for protected routes.
// Italiano: layout shell con navigazione per route protette.
// English: Sections include header, nav, and user actions.
// Italiano: Sezioni: header, nav e azioni utente.
// English: UI/UX choice: compact header to leave space for content.
// Italiano: Scelte UI/UX: header compatto per lasciare spazio ai contenuti.
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UiBadgeComponent } from '../../shared/ui/ui-badge/ui-badge.component';
import { UiButtonComponent } from '../../shared/ui/ui-button/ui-button.component';

// English: Protected shell wrapper for profile and admin pages.
// Italiano: Wrapper shell protetto per pagine profilo e admin.
@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, UiBadgeComponent, UiButtonComponent],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent {
  // English: Injected services for auth and navigation.
  // Italiano: Servizi iniettati per auth e navigazione.
  constructor(public auth: AuthService, private router: Router) {}

  /**
   * English: Logs out and redirects to login.
   * Italiano: Effettua logout e reindirizza al login.
   */
  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  // English: Returns a concise role label.
  // Italiano: Restituisce un label ruolo sintetico.
  roleLabel(role: string): string {
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
    return normalized;
  }
}
