# Riff Music App Strategy

## Goal Description
Build a simple music streaming application conceptually similar to Spotify. The app will allow users to view a list of songs and play them.
- **Backend**: Java (Spring Boot) serving REST endpoints.
- **Frontend**: React (Vite) for the UI and player logic.
- **Communication**: REST for data; Frontend manages playback state.

## User Review Required
> [!NOTE]
> We will use **Spring Boot** for the backend and **Vite + React** for the frontend.
> For the initial version, we will use an in-memory database (H2) or a simple JSON store for song metadata to keep setup easy, unless a specific DB is requested.
> Audio files will be served statically or via a stream endpoint from the backend.

## Proposed Changes

### Project Structure
Root directory will contain two main folders:
- `backend/`: Spring Boot application.
- `frontend/`: React application.

### Backend (Java/Spring Boot)
#### [NEW] `backend/pom.xml` (or `build.gradle`)
- Standard Spring Boot dependencies (Web, Lombok).

#### [NEW] `backend/src/main/java/.../SongController.java`
- `GET /api/songs`: Returns list of available songs.
- `GET /api/songs/{id}/stream`: Streams the audio file.

#### [NEW] `backend/src/main/java/.../Song.java`
- Model: `id`, `title`, `artist`, `url`, `coverImage`.

### Frontend (React)
#### [NEW] `frontend/package.json`
- React, Vite, Axios/Fetch.

#### [NEW] `frontend/src/App.jsx`
- Main layout.

#### [NEW] `frontend/src/components/SongList.jsx`
- Fetches and displays songs from `GET /api/songs`.

#### [NEW] `frontend/src/components/Player.jsx`
- Manages `<audio>` element.
- Props: `currentSong`.
- State: `isPlaying`, `progress` (handled locally).

## Verification Plan
### Automated Tests
- Backend: JUnit tests for Controllers.
- Frontend: Basic component rendering tests.

### Manual Verification
1. Start Backend: `mvn spring-boot:run`
2. Start Frontend: `npm run dev`
3. Open Web Browser.
4. Verify list of songs loads.
5. Click a song -> verify audio plays.
6. Check seeking/progress bar functionality.
