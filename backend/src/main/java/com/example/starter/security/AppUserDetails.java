package com.example.starter.security;

import com.example.starter.entity.Role;
import com.example.starter.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * English: Custom UserDetails implementation backed by User entity data.
 * Italiano: Implementazione UserDetails basata sui dati dell'entita User.
 */
@Getter
@AllArgsConstructor
public class AppUserDetails implements UserDetails {

  private final Long id;
  private final String email;
  private final String passwordHash;
  private final boolean enabled;
  private final Set<String> roles;

  /**
   * English: Builds AppUserDetails from a User entity.
   * Italiano: Crea AppUserDetails da una entita User.
   */
  public static AppUserDetails fromUser(User user) {
    Set<String> roles = user.getRoles().stream()
      .map(Role::getName)
      .map(Enum::name)
      .collect(Collectors.toSet());
    return new AppUserDetails(user.getId(), user.getEmail(), user.getPasswordHash(), user.isEnabled(), roles);
  }

  /**
   * English: Returns role names as strings.
   * Italiano: Ritorna i nomi dei ruoli come stringhe.
   */
  public Set<String> getRoles() {
    return roles;
  }

  /**
   * English: Converts role names to GrantedAuthority instances.
   * Italiano: Converte i nomi dei ruoli in GrantedAuthority.
   */
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return roles.stream()
      .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
      .collect(Collectors.toSet());
  }

  /**
   * English: Returns the password hash.
   * Italiano: Ritorna l'hash della password.
   */
  @Override
  public String getPassword() {
    return passwordHash;
  }

  /**
   * English: Returns the username (email).
   * Italiano: Ritorna lo username (email).
   */
  @Override
  public String getUsername() {
    return email;
  }

  /**
   * English: Accounts do not expire in this starter.
   * Italiano: Gli account non scadono in questo starter.
   */
  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  /**
   * English: Accounts are not locked in this starter.
   * Italiano: Gli account non sono bloccati in questo starter.
   */
  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  /**
   * English: Credentials do not expire in this starter.
   * Italiano: Le credenziali non scadono in questo starter.
   */
  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  /**
   * English: Indicates if the user is enabled.
   * Italiano: Indica se l'utente e abilitato.
   */
  @Override
  public boolean isEnabled() {
    return enabled;
  }
}
