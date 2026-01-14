package com.example.starter.service;

import com.example.starter.dto.AuthResponse;
import com.example.starter.dto.LoginRequest;
import com.example.starter.dto.RegisterRequest;
import com.example.starter.dto.UserDto;
import com.example.starter.entity.Role;
import com.example.starter.entity.RoleName;
import com.example.starter.entity.User;
import com.example.starter.repository.RoleRepository;
import com.example.starter.repository.UserRepository;
import com.example.starter.security.AppUserDetails;
import com.example.starter.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Set;

/**
 * English: Authentication service for login and registration.
 * Italiano: Servizio di autenticazione per login e registrazione.
 */
@Service
@RequiredArgsConstructor
public class AuthService {

  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;
  private final JwtUtil jwtUtil;

  /**
   * English: Authenticates a user and returns a JWT.
   * Italiano: Autentica un utente e ritorna un JWT.
   */
  public AuthResponse login(LoginRequest request) {
    Authentication authentication;
    try {
      authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
    } catch (AuthenticationException ex) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
    }

    AppUserDetails userDetails = (AppUserDetails) authentication.getPrincipal();
    String token = jwtUtil.generateToken(userDetails);
    UserDto userDto = UserMapper.toDto(userDetails);
    return new AuthResponse(token, userDto);
  }

  /**
   * English: Registers a user and returns a JWT.
   * Italiano: Registra un utente e ritorna un JWT.
   */
  public AuthResponse register(RegisterRequest request) {
    if (userRepository.existsByEmail(request.getEmail())) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already registered");
    }

    Role userRole = roleRepository.findByName(RoleName.USER)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Role missing"));

    User user = new User();
    user.setEmail(request.getEmail());
    user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
    user.setEnabled(true);
    user.setRoles(Set.of(userRole));

    User saved = userRepository.save(user);
    String token = jwtUtil.generateToken(AppUserDetails.fromUser(saved));
    return new AuthResponse(token, UserMapper.toDto(saved));
  }
}
