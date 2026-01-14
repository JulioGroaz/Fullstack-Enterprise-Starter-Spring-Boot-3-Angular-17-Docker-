package com.example.starter.controller;

import com.example.starter.dto.AdminUserCreateRequest;
import com.example.starter.dto.AdminUserUpdateRequest;
import com.example.starter.dto.UserDto;
import com.example.starter.service.AdminUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * English: Admin endpoints to manage users.
 * Italiano: Endpoint admin per gestire gli utenti.
 */
@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

  private final AdminUserService adminUserService;

  /**
   * English: Lists all users.
   * Italiano: Elenca tutti gli utenti.
   */
  @GetMapping
  public List<UserDto> list() {
    return adminUserService.listUsers();
  }

  /**
   * English: Creates a new user.
   * Italiano: Crea un nuovo utente.
   */
  @PostMapping
  public UserDto create(@Valid @RequestBody AdminUserCreateRequest request) {
    return adminUserService.create(request);
  }

  /**
   * English: Updates a user by id.
   * Italiano: Aggiorna un utente per id.
   */
  @PutMapping("/{id}")
  public UserDto update(@PathVariable Long id, @Valid @RequestBody AdminUserUpdateRequest request) {
    return adminUserService.update(id, request);
  }

  /**
   * English: Enables a user by id.
   * Italiano: Abilita un utente per id.
   */
  @PatchMapping("/{id}/enable")
  public UserDto enable(@PathVariable Long id) {
    return adminUserService.enable(id);
  }

  /**
   * English: Disables a user by id.
   * Italiano: Disabilita un utente per id.
   */
  @PatchMapping("/{id}/disable")
  public UserDto disable(@PathVariable Long id) {
    return adminUserService.disable(id);
  }

  /**
   * English: Deletes a user by id.
   * Italiano: Elimina un utente per id.
   */
  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) {
    adminUserService.delete(id);
  }
}
