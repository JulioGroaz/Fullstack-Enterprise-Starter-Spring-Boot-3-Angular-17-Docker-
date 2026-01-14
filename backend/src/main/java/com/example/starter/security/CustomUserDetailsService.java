package com.example.starter.security;

import com.example.starter.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * English: Loads users from the database for authentication.
 * Italiano: Carica gli utenti dal database per l'autenticazione.
 */
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

  private final UserRepository userRepository;

  /**
   * English: Finds a user by email and maps to UserDetails.
   * Italiano: Trova un utente per email e lo mappa in UserDetails.
   */
  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    return userRepository.findByEmail(email)
      .map(AppUserDetails::fromUser)
      .orElseThrow(() -> new UsernameNotFoundException("User not found"));
  }
}
