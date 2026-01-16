// Scopo: tabella utenti con azioni riga e badge ruolo/stato.
// Sezioni: input lista, output azioni e helper di formattazione.
// Scelte UI/UX: righe disabilitate attenuate e azioni esplicite.
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../models';
import { UiBadgeComponent } from '../../../../shared/ui/ui-badge/ui-badge.component';
import { UiButtonComponent } from '../../../../shared/ui/ui-button/ui-button.component';
import { UiToggleComponent } from '../../../../shared/ui/ui-toggle/ui-toggle.component';

export interface UserToggleEvent {
  user: User;
  nextEnabled: boolean;
}

@Component({
  selector: 'user-table',
  standalone: true,
  imports: [CommonModule, UiBadgeComponent, UiButtonComponent, UiToggleComponent],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {
  // Lista utenti da renderizzare.
  @Input() users: User[] = [];
  // Stato di caricamento per mostrare skeleton.
  @Input() loading = false;

  // Evento per richiesta di toggle stato.
  @Output() toggleStatus = new EventEmitter<UserToggleEvent>();
  // Evento per apertura dettaglio.
  @Output() viewUser = new EventEmitter<User>();
  // Evento per apertura modifica.
  @Output() editUser = new EventEmitter<User>();

  // TrackBy per righe stabili.
  trackById(_: number, user: User): number {
    return user.id;
  }

  // Formatta la label del ruolo.
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

  // Assegna un tono al badge ruolo.
  roleTone(role: string): 'neutral' | 'success' | 'warning' | 'info' {
    const normalized = role.toUpperCase();
    if (normalized.includes('ADMIN')) {
      return 'warning';
    }
    if (normalized.includes('SALES')) {
      return 'info';
    }
    if (normalized.includes('VIEW')) {
      return 'neutral';
    }
    return 'success';
  }

  // Etichetta dello stato utente.
  statusLabel(user: User): string {
    return user.enabled ? 'Attivo' : 'Disabilitato';
  }

  // Tono del badge stato.
  statusTone(user: User): 'success' | 'danger' {
    return user.enabled ? 'success' : 'danger';
  }

  // Emissione richiesta toggle con conferma a valle.
  requestToggle(user: User): void {
    this.toggleStatus.emit({ user, nextEnabled: !user.enabled });
  }
}
