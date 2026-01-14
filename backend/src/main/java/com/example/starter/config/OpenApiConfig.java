package com.example.starter.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

/**
 * English: OpenAPI metadata and security scheme configuration.
 * Italiano: Configurazione metadata OpenAPI e schema di sicurezza.
 */
@Configuration
@OpenAPIDefinition(info = @Info(title = "Starter API", version = "1.0"))
@SecurityScheme(
  name = "bearerAuth",
  type = SecuritySchemeType.HTTP,
  scheme = "bearer",
  bearerFormat = "JWT"
)
public class OpenApiConfig {
}
