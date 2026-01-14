# Fullstack Enterprise Starter

Generic fullstack monorepo template with Spring Boot backend and Angular frontend.

## Structure
- `backend/` Spring Boot 3 (Java 17) API with JWT auth, JPA, Flyway, and OpenAPI
- `frontend/` Angular 17+ standalone app with login, profile, and admin users pages
- `docker-compose.yml` local stack (MySQL, backend, frontend)

## Backend

### Prereqs
- Java 17+
- Maven 3.9+

### Run
```
cd backend
mvn spring-boot:run
```

### Environment variables
- `DB_HOST` (default: localhost)
- `DB_PORT` (default: 3306)
- `DB_NAME` (default: starterdb)
- `DB_USER` (default: starter)
- `DB_PASSWORD` (default: starter)
- `JWT_SECRET` (required, use 32+ chars for HS256)
- `JWT_EXP_MINUTES` (default: 60)
- `SEED_ADMIN` (optional, true/false)
- `ADMIN_EMAIL` (required when SEED_ADMIN=true)
- `ADMIN_PASSWORD` (required when SEED_ADMIN=true)

### Swagger
- `http://localhost:8080/swagger-ui.html`

## Frontend

### Prereqs
- Node 20+

### Run
```
cd frontend
npm install
npm start
```

### API base URL override
Set `window.__API_BASE_URL__` in `frontend/src/index.html` before `main.ts` runs.

### Config comments note
JSON files that must stay strict (like `frontend/package.json`) cannot include inline comments without breaking tools, so they are left without inline comments.
I file JSON che devono restare strict (come `frontend/package.json`) non possono includere commenti inline senza rompere gli strumenti, quindi sono lasciati senza commenti inline.

## Docker
```
docker compose up --build
```
