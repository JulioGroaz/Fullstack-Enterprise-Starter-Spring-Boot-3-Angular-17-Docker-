package com.example.starter.repository;

import com.example.starter.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * English: Repository for User entities.
 * Italiano: Repository per le entita User.
 */
public interface UserRepository extends JpaRepository<User, Long> {
  /**
   * English: Find a user by email.
   * Italiano: Trova un utente tramite email.
   */
  Optional<User> findByEmail(String email);

  /**
   * English: Check if a user exists with the given email.
   * Italiano: Verifica se esiste un utente con la email indicata.
   */
  boolean existsByEmail(String email);
}
