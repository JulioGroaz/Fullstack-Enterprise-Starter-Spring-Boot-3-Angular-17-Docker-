package com.example.starter;

import com.example.starter.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

/**
 * English: Main Spring Boot application entry point.
 * Italiano: Punto di ingresso principale dell'applicazione Spring Boot.
 */
@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class BackendApplication {
  /**
   * English: Bootstraps the Spring application.
   * Italiano: Avvia l'applicazione Spring.
   */
  public static void main(String[] args) {
    SpringApplication.run(BackendApplication.class, args);
  }
}
