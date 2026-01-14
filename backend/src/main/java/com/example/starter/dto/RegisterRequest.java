package com.example.starter.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * English: Registration request payload.
 * Italiano: Payload di richiesta registrazione.
 */
@Getter
@Setter
@NoArgsConstructor
public class RegisterRequest {
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
}
