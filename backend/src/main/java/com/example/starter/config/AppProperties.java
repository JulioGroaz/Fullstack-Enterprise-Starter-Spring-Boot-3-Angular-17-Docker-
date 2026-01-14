package com.example.starter.config;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

/**
 * English: Strongly typed application configuration properties.
 * Italiano: Proprieta di configurazione applicativa tipizzate.
 */
@Getter
@Setter
@Validated
@ConfigurationProperties(prefix = "app")
public class AppProperties {

  /**
   * English: JWT configuration block.
   * Italiano: Blocco di configurazione JWT.
   */
  @Valid
  private Jwt jwt = new Jwt();

  /**
   * English: Admin seeding configuration block.
   * Italiano: Blocco di configurazione per seed admin.
   */
  @Valid
  private SeedAdmin seedAdmin = new SeedAdmin();

  @Getter
  @Setter
  /**
   * English: JWT-related settings.
   * Italiano: Impostazioni relative ai JWT.
   */
  public static class Jwt {
    /**
     * English: Secret used to sign JWT tokens.
     * Italiano: Segreto usato per firmare i token JWT.
     */
    @NotBlank
    private String secret;

    /**
     * English: Token expiration in minutes.
     * Italiano: Scadenza del token in minuti.
     */
    @Min(1)
    private long expirationMinutes = 60;
  }

  @Getter
  @Setter
  /**
   * English: Optional admin seed settings.
   * Italiano: Impostazioni opzionali per il seed admin.
   */
  public static class SeedAdmin {
    /**
     * English: Enable admin user creation on startup.
     * Italiano: Abilita la creazione dell'utente admin all'avvio.
     */
    private boolean enabled = false;
    /**
     * English: Email for the seeded admin user.
     * Italiano: Email per l'utente admin seed.
     */
    private String email;
    /**
     * English: Password for the seeded admin user.
     * Italiano: Password per l'utente admin seed.
     */
    private String password;
  }
}
