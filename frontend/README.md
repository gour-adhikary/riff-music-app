# Riff Music App - Frontend

React-based frontend for the Riff music streaming application.

## Technologies
- React 19
- Vite 7
- Vanilla CSS (Modern design system)
- HTML5 Audio API

## Features
- 🎵 Song list with search functionality
- 🎨 Spotify-inspired dark theme
- 🎮 Full music player controls (play/pause, seek, volume)
- 📱 Responsive design
- ⚡ Fast development with Vite HMR
- 🔄 Real-time API integration with Spring Boot backend

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Backend server running on `http://localhost:8080`

### Installation

```bash
cd frontend
npm install
```

### Running the Application

```bash
npm run dev
```

The app will start on `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── SongList.jsx       # Song list with search
│   │   ├── SongList.css
│   │   ├── Player.jsx          # Music player controls
│   │   └── Player.css
│   ├── services/
│   │   └── songService.js      # API integration layer
│   ├── App.jsx                 # Main application component
│   ├── App.css
│   ├── index.css               # Global styles & design system
│   └── main.jsx                # Application entry point
├── public/
├── index.html
├── package.json
└── vite.config.js
```

## Components

### SongList
Displays all available songs with:
- Grid layout showing song number, cover, title, artist, album, duration
- Real-time search across title, artist, and album
- Visual indicator for currently playing song
- Loading and empty states

### Player
Fixed bottom player with:
- Play/Pause button
- Progress bar with seek functionality
- Current time / Total duration display
- Volume control with mute toggle
- Song information display

### App
Main component that:
- Manages application state
- Fetches songs from backend API
- Handles song selection
- Coordinates SongList and Player components
- Provides error handling and retry functionality

## API Integration

The frontend communicates with the Spring Boot backend via REST API:

- `GET /api/songs` - Fetch all songs
- `GET /api/songs/{id}` - Fetch specific song
- `GET /api/songs/{id}/stream` - Stream audio file
- `POST /api/songs` - Create new song
- `PUT /api/songs/{id}` - Update song
- `DELETE /api/songs/{id}` - Delete song

## Design System

The app uses a custom CSS design system with:
- CSS variables for theming
- Spotify-inspired color palette
- Smooth animations and transitions
- Responsive utilities
- Custom scrollbar styling

### Color Palette
- Primary: `#1db954` (Spotify green)
- Background: `#121212`
- Surface: `#181818`
- Text: `#ffffff` / `#b3b3b3`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Notes

- Audio files are streamed from the backend
- The app uses HTML5 `<audio>` element for playback
- CORS is configured to allow requests from `localhost:5173`
