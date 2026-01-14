package com.example.starter.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * English: Role entity stored in the roles table.
 * Italiano: Entita Role salvata nella tabella roles.
 */
@Entity
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor
public class Role {

  /**
   * English: Primary key.
   * Italiano: Chiave primaria.
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  /**
   * English: Enum name of the role.
   * Italiano: Nome enum del ruolo.
   */
  @Enumerated(EnumType.STRING)
  @Column(nullable = false, unique = true)
  private RoleName name;
}
