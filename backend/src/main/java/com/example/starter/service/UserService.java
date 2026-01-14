package com.example.starter.service;

import com.example.starter.dto.UserDto;
import com.example.starter.security.AppUserDetails;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

/**
 * English: User-facing service for profile data.
 * Italiano: Servizio per dati profilo utente.
 */
@Service
public class UserService {

  /**
   * English: Returns the current authenticated user.
   * Italiano: Ritorna l'utente autenticato corrente.
   */
  public UserDto getCurrentUser(Authentication authentication) {
    if (authentication == null || !(authentication.getPrincipal() instanceof AppUserDetails)) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
    }
    return UserMapper.toDto((AppUserDetails) authentication.getPrincipal());
  }
}
