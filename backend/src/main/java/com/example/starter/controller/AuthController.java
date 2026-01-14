package com.example.starter.controller;

import com.example.starter.dto.AuthResponse;
import com.example.starter.dto.LoginRequest;
import com.example.starter.dto.RegisterRequest;
import com.example.starter.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * English: Authentication endpoints for login and registration.
 * Italiano: Endpoint di autenticazione per login e registrazione.
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthService authService;

  /**
   * English: Logs in a user with email and password.
   * Italiano: Effettua login con email e password.
   */
  @PostMapping("/login")
  public AuthResponse login(@Valid @RequestBody LoginRequest request) {
    return authService.login(request);
  }

  /**
   * English: Registers a new user.
   * Italiano: Registra un nuovo utente.
   */
  @PostMapping("/register")
  public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
    return authService.register(request);
  }
}
