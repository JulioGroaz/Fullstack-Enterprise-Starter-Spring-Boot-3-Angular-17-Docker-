package com.example.starter.dto;

import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

/**
 * English: Admin request payload to update a user.
 * Italiano: Payload admin per aggiornare un utente.
 */
@Getter
@Setter
@NoArgsConstructor
public class AdminUserUpdateRequest {
  /**
   * English: Optional email update.
   * Italiano: Aggiornamento email opzionale.
   */
  @Email
  private String email;

  /**
   * English: Optional password update.
   * Italiano: Aggiornamento password opzionale.
   */
  private String password;

  /**
   * English: Optional role list update.
   * Italiano: Aggiornamento lista ruoli opzionale.
   */
  private Set<String> roles;

  /**
   * English: Optional enabled flag update.
   * Italiano: Aggiornamento flag enabled opzionale.
   */
  private Boolean enabled;
}
