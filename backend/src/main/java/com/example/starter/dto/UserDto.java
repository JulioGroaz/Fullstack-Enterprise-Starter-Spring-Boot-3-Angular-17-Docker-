package com.example.starter.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

/**
 * English: User data transfer object exposed by the API.
 * Italiano: DTO utente esposto dalla API.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
  /**
   * English: User identifier.
   * Italiano: Identificativo utente.
   */
  private Long id;
  /**
   * English: User email.
   * Italiano: Email utente.
   */
  private String email;
  /**
   * English: Enabled status.
   * Italiano: Stato abilitato.
   */
  private boolean enabled;
  /**
   * English: Role names assigned to the user.
   * Italiano: Nomi dei ruoli assegnati all'utente.
   */
  private Set<String> roles;
}
