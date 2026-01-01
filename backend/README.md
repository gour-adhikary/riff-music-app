# Riff Music App - Backend

Spring Boot backend for the Riff music streaming application.

## Technologies
- Java 17
- Spring Boot 3.2.1
- Spring Data JPA
- H2 Database (in-memory)
- Maven

## Getting Started

### Prerequisites
- Java 17 or higher
- Maven 3.6+

### Running the Application

```bash
cd backend
mvn spring-boot:run
```

The server will start on `http://localhost:8080`

### H2 Console
Access the H2 database console at: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:riffdb`
- Username: `sa`
- Password: (leave blank)

## API Endpoints

### Songs
- `GET /api/songs` - Get all songs
- `GET /api/songs/{id}` - Get a specific song
- `POST /api/songs` - Create a new song
- `PUT /api/songs/{id}` - Update a song
- `DELETE /api/songs/{id}` - Delete a song
- `GET /api/songs/{id}/stream` - Stream audio file

## Project Structure
```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/riff/musicapp/
│   │   │   ├── config/          # Configuration classes
│   │   │   ├── controller/      # REST controllers
│   │   │   ├── model/           # Entity models
│   │   │   ├── repository/      # JPA repositories
│   │   │   ├── service/         # Business logic
│   │   │   └── MusicAppApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
└── pom.xml
```
