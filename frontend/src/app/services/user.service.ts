// English: Service for user profile and admin user APIs.
// Italiano: Servizio per profilo utente e API admin utenti.
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api-base';
import { User } from '../models';

/**
 * English: User service for profile and admin operations.
 * Italiano: Servizio utente per profilo e operazioni admin.
 */
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  /**
   * English: Fetches the current user profile.
   * Italiano: Recupera il profilo utente corrente.
   */
  getMe(): Observable<User> {
    return this.http.get<User>(`${API_BASE_URL}/users/me`);
  }

  /**
   * English: Lists all users (admin endpoint).
   * Italiano: Lista tutti gli utenti (endpoint admin).
   */
  adminListUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${API_BASE_URL}/admin/users`);
  }

  /**
   * English: Enables a user by id (admin endpoint).
   * Italiano: Abilita un utente per id (endpoint admin).
   */
  adminEnable(id: number): Observable<User> {
    return this.http.patch<User>(`${API_BASE_URL}/admin/users/${id}/enable`, {});
  }

  /**
   * English: Disables a user by id (admin endpoint).
   * Italiano: Disabilita un utente per id (endpoint admin).
   */
  adminDisable(id: number): Observable<User> {
    return this.http.patch<User>(`${API_BASE_URL}/admin/users/${id}/disable`, {});
  }
}
