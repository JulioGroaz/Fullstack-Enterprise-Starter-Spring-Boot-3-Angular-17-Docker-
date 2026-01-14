package com.example.starter.service;

import com.example.starter.dto.AdminUserCreateRequest;
import com.example.starter.dto.AdminUserUpdateRequest;
import com.example.starter.dto.UserDto;
import com.example.starter.entity.Role;
import com.example.starter.entity.RoleName;
import com.example.starter.entity.User;
import com.example.starter.repository.RoleRepository;
import com.example.starter.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * English: Admin operations for managing users.
 * Italiano: Operazioni admin per gestire gli utenti.
 */
@Service
@RequiredArgsConstructor
public class AdminUserService {

  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final PasswordEncoder passwordEncoder;

  /**
   * English: Returns all users as DTOs.
   * Italiano: Ritorna tutti gli utenti come DTO.
   */
  public List<UserDto> listUsers() {
    return userRepository.findAll().stream()
      .map(UserMapper::toDto)
      .collect(Collectors.toList());
  }

  /**
   * English: Creates a new user with optional roles.
   * Italiano: Crea un nuovo utente con ruoli opzionali.
   */
  public UserDto create(AdminUserCreateRequest request) {
    if (userRepository.existsByEmail(request.getEmail())) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
    }

    User user = new User();
    user.setEmail(request.getEmail());
    user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
    user.setEnabled(request.getEnabled() == null || request.getEnabled());
    user.setRoles(resolveRoles(request.getRoles()));

    return UserMapper.toDto(userRepository.save(user));
  }

  /**
   * English: Updates an existing user.
   * Italiano: Aggiorna un utente esistente.
   */
  public UserDto update(Long id, AdminUserUpdateRequest request) {
    User user = userRepository.findById(id)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

    if (StringUtils.hasText(request.getEmail()) && !request.getEmail().equalsIgnoreCase(user.getEmail())) {
      if (userRepository.existsByEmail(request.getEmail())) {
        throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
      }
      user.setEmail(request.getEmail());
    }

    if (StringUtils.hasText(request.getPassword())) {
      user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
    }

    if (request.getEnabled() != null) {
      user.setEnabled(request.getEnabled());
    }

    if (request.getRoles() != null) {
      user.setRoles(resolveRoles(request.getRoles()));
    }

    return UserMapper.toDto(userRepository.save(user));
  }

  /**
   * English: Enables a user account.
   * Italiano: Abilita un account utente.
   */
  public UserDto enable(Long id) {
    User user = userRepository.findById(id)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    user.setEnabled(true);
    return UserMapper.toDto(userRepository.save(user));
  }

  /**
   * English: Disables a user account.
   * Italiano: Disabilita un account utente.
   */
  public UserDto disable(Long id) {
    User user = userRepository.findById(id)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    user.setEnabled(false);
    return UserMapper.toDto(userRepository.save(user));
  }

  /**
   * English: Deletes a user account.
   * Italiano: Elimina un account utente.
   */
  public void delete(Long id) {
    User user = userRepository.findById(id)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    userRepository.delete(user);
  }

  /**
   * English: Resolves role names to Role entities.
   * Italiano: Risolve i nomi ruoli in entita Role.
   */
  private Set<Role> resolveRoles(Set<String> roles) {
    Set<String> roleNames = roles == null || roles.isEmpty()
      ? Set.of(RoleName.USER.name())
      : new HashSet<>(roles);

    return roleNames.stream()
      .map(this::parseRoleName)
      .map(roleName -> roleRepository.findByName(roleName)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid role: " + roleName)))
      .collect(Collectors.toSet());
  }

  /**
   * English: Parses a role name to RoleName enum.
   * Italiano: Converte un nome ruolo in enum RoleName.
   */
  private RoleName parseRoleName(String name) {
    try {
      return RoleName.valueOf(name.toUpperCase());
    } catch (IllegalArgumentException ex) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid role: " + name);
    }
  }
}
