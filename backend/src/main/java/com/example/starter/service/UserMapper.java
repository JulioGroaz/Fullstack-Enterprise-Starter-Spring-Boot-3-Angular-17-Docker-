package com.example.starter.service;

import com.example.starter.dto.UserDto;
import com.example.starter.entity.Role;
import com.example.starter.entity.User;
import com.example.starter.security.AppUserDetails;

import java.util.Set;
import java.util.stream.Collectors;

/**
 * English: Maps User entities and user details to DTOs.
 * Italiano: Mappa entita User e user details in DTO.
 */
public final class UserMapper {

  /**
   * English: Utility class, no instances allowed.
   * Italiano: Classe utility, non istanziabile.
   */
  private UserMapper() {
  }

  /**
   * English: Maps a User entity to UserDto.
   * Italiano: Mappa una entita User in UserDto.
   */
  public static UserDto toDto(User user) {
    return new UserDto(user.getId(), user.getEmail(), user.isEnabled(), roleNames(user.getRoles()));
  }

  /**
   * English: Maps AppUserDetails to UserDto.
   * Italiano: Mappa AppUserDetails in UserDto.
   */
  public static UserDto toDto(AppUserDetails userDetails) {
    return new UserDto(userDetails.getId(), userDetails.getUsername(), userDetails.isEnabled(), userDetails.getRoles());
  }

  /**
   * English: Extracts role names from Role entities.
   * Italiano: Estrae i nomi dei ruoli dalle entita Role.
   */
  private static Set<String> roleNames(Set<Role> roles) {
    return roles.stream()
      .map(role -> role.getName().name())
      .collect(Collectors.toSet());
  }
}
