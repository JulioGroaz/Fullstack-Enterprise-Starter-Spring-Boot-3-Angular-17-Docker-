// Scopo: layout shell con navigazione per route protette.
// Sezioni: header, nav e azioni utente.
// Scelte UI/UX: header compatto per lasciare spazio ai contenuti.
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UiBadgeComponent } from '../../shared/ui/ui-badge/ui-badge.component';
import { UiButtonComponent } from '../../shared/ui/ui-button/ui-button.component';

// Wrapper shell protetto per pagine profilo e admin.
@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, UiBadgeComponent, UiButtonComponent],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent {
  // Servizi iniettati per auth e navigazione.
  constructor(public auth: AuthService, private router: Router) {}

  /**
   * Effettua logout e reindirizza al login.
   */
  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  // Restituisce un label ruolo sintetico.
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
