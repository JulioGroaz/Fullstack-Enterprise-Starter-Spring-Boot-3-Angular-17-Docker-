package com.example.starter.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * English: Authentication response containing token and user info.
 * Italiano: Risposta autenticazione con token e info utente.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
  /**
   * English: JWT token string.
   * Italiano: Stringa token JWT.
   */
  private String token;
  /**
   * English: Logged-in user info.
   * Italiano: Info dell'utente loggato.
   */
  private UserDto user;
}
