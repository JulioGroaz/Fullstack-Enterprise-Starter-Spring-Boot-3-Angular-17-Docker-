package com.example.starter.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

/**
 * English: Standard error payload for API responses.
 * Italiano: Payload errore standard per risposte API.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApiError {
  /**
   * English: Error timestamp.
   * Italiano: Timestamp dell'errore.
   */
  private Instant timestamp;
  /**
   * English: HTTP status code.
   * Italiano: Codice di stato HTTP.
   */
  private int status;
  /**
   * English: HTTP error name.
   * Italiano: Nome errore HTTP.
   */
  private String error;
  /**
   * English: Human-readable message.
   * Italiano: Messaggio leggibile.
   */
  private String message;
  /**
   * English: Request path.
   * Italiano: Path della richiesta.
   */
  private String path;
}
