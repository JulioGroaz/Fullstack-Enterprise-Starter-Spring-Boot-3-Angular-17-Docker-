package com.example.starter.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * English: User entity with credentials and roles.
 * Italiano: Entita utente con credenziali e ruoli.
 */
@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User {

  /**
   * English: Primary key.
   * Italiano: Chiave primaria.
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  /**
   * English: Unique email used for login.
   * Italiano: Email unica usata per il login.
   */
  @Column(nullable = false, unique = true)
  private String email;

  /**
   * English: BCrypt password hash.
   * Italiano: Hash BCrypt della password.
   */
  @Column(name = "password_hash", nullable = false)
  private String passwordHash;

  /**
   * English: Indicates if the account is enabled.
   * Italiano: Indica se l'account e abilitato.
   */
  @Column(nullable = false)
  private boolean enabled = true;

  /**
   * English: Creation timestamp.
   * Italiano: Timestamp di creazione.
   */
  @Column(name = "created_at", nullable = false, updatable = false)
  private Instant createdAt;

  /**
   * English: Last update timestamp.
   * Italiano: Timestamp di ultimo aggiornamento.
   */
  @Column(name = "updated_at", nullable = false)
  private Instant updatedAt;

  /**
   * English: Roles assigned to the user.
   * Italiano: Ruoli assegnati all'utente.
   */
  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(
    name = "user_roles",
    joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "role_id")
  )
  private Set<Role> roles = new HashSet<>();

  /**
   * English: Initialize timestamps before insert.
   * Italiano: Inizializza i timestamp prima dell'inserimento.
   */
  @PrePersist
  public void prePersist() {
    Instant now = Instant.now();
    createdAt = now;
    updatedAt = now;
  }

  /**
   * English: Update timestamp before update.
   * Italiano: Aggiorna il timestamp prima dell'update.
   */
  @PreUpdate
  public void preUpdate() {
    updatedAt = Instant.now();
  }
}
