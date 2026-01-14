package com.example.starter.security;

import com.example.starter.exception.ApiError;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Instant;

/**
 * English: Returns JSON errors for unauthenticated requests.
 * Italiano: Ritorna errori JSON per richieste non autenticate.
 */
@Component
@RequiredArgsConstructor
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {

  private final ObjectMapper objectMapper;

  /**
   * English: Writes a 401 error response.
   * Italiano: Scrive una risposta di errore 401.
   */
  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response,
                       AuthenticationException authException) throws IOException {
    ApiError error = new ApiError(Instant.now(), HttpStatus.UNAUTHORIZED.value(),
      HttpStatus.UNAUTHORIZED.getReasonPhrase(), authException.getMessage(), request.getRequestURI());
    response.setStatus(HttpStatus.UNAUTHORIZED.value());
    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
    objectMapper.writeValue(response.getOutputStream(), error);
  }
}
