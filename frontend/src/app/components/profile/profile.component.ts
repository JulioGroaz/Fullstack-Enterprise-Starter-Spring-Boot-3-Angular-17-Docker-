// English: Profile page component for the current user.
// Italiano: Componente pagina profilo per l'utente corrente.
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models';

/**
 * English: Shows the authenticated user's profile data.
 * Italiano: Mostra i dati profilo dell'utente autenticato.
 */
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // English: Loaded profile data for the current user.
  // Italiano: Dati profilo caricati per l'utente corrente.
  user: User | null = null;

  // English: Injected service for profile APIs.
  // Italiano: Servizio iniettato per API profilo.
  constructor(private userService: UserService) {}

  /**
   * English: Loads the current user profile on init.
   * Italiano: Carica il profilo utente all'avvio.
   */
  ngOnInit(): void {
    this.userService.getMe().subscribe(user => {
      this.user = user;
    });
  }
}
