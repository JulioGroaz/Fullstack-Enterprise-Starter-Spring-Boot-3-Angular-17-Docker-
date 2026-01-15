// English: Shell layout with navigation for protected routes.
// Italiano: Layout shell con navigazione per route protette.
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

/**
 * English: Protected shell wrapper for profile and admin pages.
 * Italiano: Wrapper shell protetto per pagine profilo e admin.
 */
@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent {
  // English: Injected services for auth and navigation.
  // Italiano: Servizi iniettati per auth e navigazione.
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
