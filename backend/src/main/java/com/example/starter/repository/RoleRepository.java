package com.example.starter.repository;

import com.example.starter.entity.Role;
import com.example.starter.entity.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * English: Repository for Role entities.
 * Italiano: Repository per le entita Role.
 */
public interface RoleRepository extends JpaRepository<Role, Long> {
  /**
   * English: Find a role by its enum name.
   * Italiano: Trova un ruolo per il suo nome enum.
   */
  Optional<Role> findByName(RoleName name);
}
