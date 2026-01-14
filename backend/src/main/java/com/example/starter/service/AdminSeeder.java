package com.example.starter.service;

import com.example.starter.config.AppProperties;
import com.example.starter.entity.Role;
import com.example.starter.entity.RoleName;
import com.example.starter.entity.User;
import com.example.starter.repository.RoleRepository;
import com.example.starter.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.Set;

/**
 * English: Seeds an admin user on startup when enabled.
 * Italiano: Esegue il seed di un utente admin all'avvio se abilitato.
 */
@Component
@RequiredArgsConstructor
public class AdminSeeder implements ApplicationRunner {

  private final AppProperties properties;
  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final PasswordEncoder passwordEncoder;

  /**
   * English: Creates the admin user if configured and missing.
   * Italiano: Crea l'utente admin se configurato e mancante.
   */
  @Override
  public void run(ApplicationArguments args) {
    if (!properties.getSeedAdmin().isEnabled()) {
      return;
    }

    String email = properties.getSeedAdmin().getEmail();
    String password = properties.getSeedAdmin().getPassword();
    if (!StringUtils.hasText(email) || !StringUtils.hasText(password)) {
      throw new IllegalStateException("ADMIN_EMAIL and ADMIN_PASSWORD must be set when SEED_ADMIN=true");
    }

    if (userRepository.existsByEmail(email)) {
      return;
    }

    Role adminRole = roleRepository.findByName(RoleName.ADMIN)
      .orElseThrow(() -> new IllegalStateException("ADMIN role not found"));
    Role userRole = roleRepository.findByName(RoleName.USER)
      .orElseThrow(() -> new IllegalStateException("USER role not found"));

    User admin = new User();
    admin.setEmail(email);
    admin.setPasswordHash(passwordEncoder.encode(password));
    admin.setEnabled(true);
    admin.setRoles(Set.of(adminRole, userRole));
    userRepository.save(admin);
  }
}
