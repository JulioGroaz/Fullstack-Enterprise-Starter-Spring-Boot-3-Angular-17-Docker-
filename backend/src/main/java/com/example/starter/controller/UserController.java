package com.example.starter.controller;

import com.example.starter.dto.UserDto;
import com.example.starter.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * English: User endpoints for the authenticated profile.
 * Italiano: Endpoint utente per il profilo autenticato.
 */
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  /**
   * English: Returns the current user profile.
   * Italiano: Ritorna il profilo dell'utente corrente.
   */
  @GetMapping("/me")
  public UserDto me(Authentication authentication) {
    return userService.getCurrentUser(authentication);
  }
}
