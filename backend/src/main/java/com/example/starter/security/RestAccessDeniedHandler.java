package com.example.starter.security;

import com.example.starter.exception.ApiError;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Instant;

/**
 * English: Returns JSON errors for forbidden requests.
 * Italiano: Ritorna errori JSON per richieste proibite.
 */
@Component
@RequiredArgsConstructor
public class RestAccessDeniedHandler implements AccessDeniedHandler {

  private final ObjectMapper objectMapper;

  /**
   * English: Writes a 403 error response.
   * Italiano: Scrive una risposta di errore 403.
   */
  @Override
  public void handle(HttpServletRequest request, HttpServletResponse response,
                     AccessDeniedException accessDeniedException) throws IOException {
    ApiError error = new ApiError(Instant.now(), HttpStatus.FORBIDDEN.value(),
      HttpStatus.FORBIDDEN.getReasonPhrase(), accessDeniedException.getMessage(), request.getRequestURI());
    response.setStatus(HttpStatus.FORBIDDEN.value());
    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
    objectMapper.writeValue(response.getOutputStream(), error);
  }
}
