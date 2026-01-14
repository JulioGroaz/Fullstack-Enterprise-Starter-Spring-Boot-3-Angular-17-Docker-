// English: Service handling authentication state and API calls.
// Italiano: Servizio che gestisce stato autenticazione e chiamate API.
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { API_BASE_URL } from '../api-base';
import { AuthResponse, User } from '../models';

/**
 * English: Auth service for login/logout and token storage.
 * Italiano: Servizio auth per login/logout e storage token.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'auth_token';
  private readonly userKey = 'auth_user';
  private userSubject = new BehaviorSubject<User | null>(this.loadUser());

  constructor(private http: HttpClient) {}

  /**
   * English: Calls login endpoint and stores session.
   * Italiano: Chiama endpoint login e salva la sessione.
   */
  login(email: string, password: string): Observable<User> {
    return this.http.post<AuthResponse>(`${API_BASE_URL}/auth/login`, { email, password })
      .pipe(
        tap(response => this.setSession(response)),
        map(response => response.user)
      );
  }

  /**
   * English: Clears local session and user data.
   * Italiano: Pulisce la sessione locale e i dati utente.
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.userSubject.next(null);
  }

  /**
   * English: Reads the current JWT token.
   * Italiano: Legge il token JWT corrente.
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * English: Returns the cached user.
   * Italiano: Ritorna l'utente in cache.
   */
  getUser(): User | null {
    return this.userSubject.value;
  }

  /**
   * English: Checks if a token exists.
   * Italiano: Verifica se esiste un token.
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * English: Checks if the user has the given role.
   * Italiano: Verifica se l'utente ha il ruolo indicato.
   */
  hasRole(role: string): boolean {
    return this.getUser()?.roles?.includes(role) ?? false;
  }

  /**
   * English: Persists token and user in localStorage.
   * Italiano: Salva token e utente in localStorage.
   */
  private setSession(response: AuthResponse): void {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem(this.userKey, JSON.stringify(response.user));
    this.userSubject.next(response.user);
  }

  /**
   * English: Loads user data from localStorage.
   * Italiano: Carica i dati utente da localStorage.
   */
  private loadUser(): User | null {
    const raw = localStorage.getItem(this.userKey);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }
}
