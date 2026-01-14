package com.example.starter.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.stream.Collectors;

/**
 * English: Global exception handling for REST controllers.
 * Italiano: Gestione globale delle eccezioni per i controller REST.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

  /**
   * English: Handles validation errors and returns a structured error.
   * Italiano: Gestisce errori di validazione e ritorna un errore strutturato.
   */
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiError> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest request) {
    String message = ex.getBindingResult().getFieldErrors().stream()
      .map(this::formatFieldError)
      .collect(Collectors.joining(", "));
    ApiError error = new ApiError(Instant.now(), HttpStatus.BAD_REQUEST.value(),
      HttpStatus.BAD_REQUEST.getReasonPhrase(), message, request.getRequestURI());
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
  }

  /**
   * English: Handles ResponseStatusException and maps it to ApiError.
   * Italiano: Gestisce ResponseStatusException e la mappa in ApiError.
   */
  @ExceptionHandler(ResponseStatusException.class)
  public ResponseEntity<ApiError> handleResponseStatus(ResponseStatusException ex, HttpServletRequest request) {
    HttpStatus status = HttpStatus.valueOf(ex.getStatusCode().value());
    ApiError error = new ApiError(Instant.now(), status.value(), status.getReasonPhrase(),
      ex.getReason(), request.getRequestURI());
    return ResponseEntity.status(status).body(error);
  }

  /**
   * English: Handles authentication exceptions.
   * Italiano: Gestisce eccezioni di autenticazione.
   */
  @ExceptionHandler(AuthenticationException.class)
  public ResponseEntity<ApiError> handleAuth(AuthenticationException ex, HttpServletRequest request) {
    ApiError error = new ApiError(Instant.now(), HttpStatus.UNAUTHORIZED.value(),
      HttpStatus.UNAUTHORIZED.getReasonPhrase(), ex.getMessage(), request.getRequestURI());
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
  }

  /**
   * English: Handles unexpected exceptions.
   * Italiano: Gestisce eccezioni non previste.
   */
  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiError> handleGeneric(Exception ex, HttpServletRequest request) {
    ApiError error = new ApiError(Instant.now(), HttpStatus.INTERNAL_SERVER_ERROR.value(),
      HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(), ex.getMessage(), request.getRequestURI());
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
  }

  /**
   * English: Formats a validation field error message.
   * Italiano: Formatta il messaggio di errore di un campo validato.
   */
  private String formatFieldError(FieldError error) {
    return error.getField() + ": " + error.getDefaultMessage();
  }
}
