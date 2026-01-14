FROM maven:3.9-eclipse-temurin-17 AS build
# English: Build stage with Maven and JDK 17.
# Italiano: Fase di build con Maven e JDK 17.
WORKDIR /app
# English: Copy sources and build the runnable jar.
# Italiano: Copia sorgenti e compila il jar eseguibile.
COPY pom.xml .
COPY src ./src
RUN mvn -q -DskipTests package

FROM eclipse-temurin:17-jre
# English: Runtime stage with slim JRE 17.
# Italiano: Fase runtime con JRE 17 minimale.
WORKDIR /app
# English: Copy the built jar from build stage.
# Italiano: Copia il jar compilato dalla fase di build.
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
# English: Run the Spring Boot application.
# Italiano: Avvia l'applicazione Spring Boot.
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
