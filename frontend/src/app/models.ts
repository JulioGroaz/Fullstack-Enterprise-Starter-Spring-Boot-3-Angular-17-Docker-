/**
 * English: User model returned by the backend.
 * Italiano: Modello utente ritornato dal backend.
 */
export interface User {
  /** English: User identifier. Italiano: Identificativo utente. */
  id: number;
  /** English: User email. Italiano: Email utente. */
  email: string;
  /** English: Enabled status. Italiano: Stato abilitato. */
  enabled: boolean;
  /** English: Role names. Italiano: Nomi dei ruoli. */
  roles: string[];
}

/**
 * English: Authentication response shape.
 * Italiano: Forma della risposta di autenticazione.
 */
export interface AuthResponse {
  /** English: JWT token. Italiano: Token JWT. */
  token: string;
  /** English: Logged-in user. Italiano: Utente loggato. */
  user: User;
}
