// Scopo: pagina profilo per l'utente autenticato.
// Sezioni: stato utente e caricamento dati.
// Scelte UI/UX: informazioni essenziali in card singola.
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models';
import { CardComponent } from '../../shared/layout/card/card.component';
import { UiBadgeComponent } from '../../shared/ui/ui-badge/ui-badge.component';

// Mostra i dati profilo dell'utente autenticato.
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, CardComponent, UiBadgeComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // Dati profilo caricati per l'utente corrente.
  user: User | null = null;

  // Servizio iniettato per API profilo.
  constructor(private userService: UserService) {}

  /**
   * Carica il profilo utente all'avvio.
   */
  ngOnInit(): void {
    this.userService.getMe().subscribe(user => {
      this.user = user;
    });
  }

  // Label leggibile per il ruolo.
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
    return normalized.charAt(0).toUpperCase() + normalized.slice(1).toLowerCase();
  }

  // Tono badge per ruolo.
  roleTone(role: string): 'info' | 'warning' | 'neutral' {
    const upper = role.toUpperCase();
    if (upper.includes('ADMIN')) {
      return 'warning';
    }
    if (upper.includes('VIEW')) {
      return 'neutral';
    }
    return 'info';
  }

  // Tono badge per stato.
  statusTone(): 'success' | 'danger' {
    return this.user?.enabled ? 'success' : 'danger';
  }
}
