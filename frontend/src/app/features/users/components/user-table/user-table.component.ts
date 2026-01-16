// English: Users table with row actions and role/status badges.
// Italiano: tabella utenti con azioni riga e badge ruolo/stato.
// English: Sections include list input, action outputs, and formatting helpers.
// Italiano: Sezioni: input lista, output azioni e helper di formattazione.
// English: UI/UX choice: dimmed disabled rows and explicit actions.
// Italiano: Scelte UI/UX: righe disabilitate attenuate e azioni esplicite.
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
  // English: Users list to render.
  // Italiano: Lista utenti da renderizzare.
  @Input() users: User[] = [];
  // English: Loading state to show skeleton.
  // Italiano: Stato di caricamento per mostrare skeleton.
  @Input() loading = false;

  // English: Event for status toggle request.
  // Italiano: Evento per richiesta di toggle stato.
  @Output() toggleStatus = new EventEmitter<UserToggleEvent>();
  // English: Event to open details.
  // Italiano: Evento per apertura dettaglio.
  @Output() viewUser = new EventEmitter<User>();
  // English: Event to open edit.
  // Italiano: Evento per apertura modifica.
  @Output() editUser = new EventEmitter<User>();

  // English: TrackBy for stable rows.
  // Italiano: TrackBy per righe stabili.
  trackById(_: number, user: User): number {
    return user.id;
  }

  // English: Formats the role label.
  // Italiano: Formatta la label del ruolo.
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

  // English: Assigns a tone to the role badge.
  // Italiano: Assegna un tono al badge ruolo.
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

  // English: User status label.
  // Italiano: Etichetta dello stato utente.
  statusLabel(user: User): string {
    return user.enabled ? 'Active' : 'Disabled';
  }

  // English: Status badge tone.
  // Italiano: Tono del badge stato.
  statusTone(user: User): 'success' | 'danger' {
    return user.enabled ? 'success' : 'danger';
  }

  // English: Emits toggle request with confirmation downstream.
  // Italiano: Emissione richiesta toggle con conferma a valle.
  requestToggle(user: User): void {
    this.toggleStatus.emit({ user, nextEnabled: !user.enabled });
  }

  // English: Checks if the user has only the admin role.
  // Italiano: Verifica se l'utente ha solo il ruolo admin.
  isAdminOnly(user: User): boolean {
    const roles = user.roles ?? [];
    const hasAdmin = roles.some(role => role.toUpperCase().includes('ADMIN'));
    const hasNonAdmin = roles.some(role => !role.toUpperCase().includes('ADMIN'));
    return hasAdmin && !hasNonAdmin;
  }
}
