package com.example.starter.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

/**
 * English: Admin request payload to create a user.
 * Italiano: Payload admin per creare un utente.
 */
@Getter
@Setter
@NoArgsConstructor
public class AdminUserCreateRequest {
  /**
   * English: User email.
   * Italiano: Email utente.
   */
  @Email
  @NotBlank
  private String email;

  /**
   * English: Plain text password.
   * Italiano: Password in chiaro.
   */
  @NotBlank
  private String password;

  /**
   * English: Optional role names.
   * Italiano: Nomi ruoli opzionali.
   */
  private Set<String> roles;

  /**
   * English: Optional enabled flag.
   * Italiano: Flag enabled opzionale.
   */
  private Boolean enabled;
}
