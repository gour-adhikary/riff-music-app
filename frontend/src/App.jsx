import { useState, useEffect } from 'react';
import SongList from './components/SongList';
import Player from './components/Player';
import { songService } from './services/songService';
import './App.css';

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSongs();
  }, []);

  const loadSongs = async () => {
    try {
      setLoading(true);
      const data = await songService.getAllSongs();
      setSongs(data);
      setError(null);
    } catch (err) {
      setError('Failed to load songs. Make sure the backend is running on http://localhost:8080');
      console.error('Error loading songs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSongSelect = (song) => {
    setCurrentSong(song);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">
          <svg viewBox="0 0 1323.8 627.06" fill="currentColor">
            {/* RenOliver Electric Guitar */}
            <g transform="translate(229.06 -205.99)">
              <path d="m110.13 429.96l137.65-98.8c72.14-45.97 123.34-20.32 127.27-7.41-108.92 39.89-129.28 97.19-88.31 117.33l592.16-196.37c7.95 21.94 16.06 40.56 20.78 54.03l-601.25 210.26c-71.66 23-67.68 108.56 14.28 96.34 35.27-10.12 83.37-4.07 38.96 39.52-29.89 26.25-65.88 26.41-102.59 23.46-44.91-1.86-87.06-5.41-135.05 49.41-53.429 82.83-198.01 158.39-281.8 76.57-93.64-130.76-84.21-331.48 109.08-370.51l168.82 6.17z" stroke="#000" strokeWidth="7.092" fillRule="evenodd" />
              <path d="m-26.223 633.74c-16.55 90.8-56.434 130.5-103.89 149.44l-1.3 16.06c54.541 5.23 109.08 5.86 163.62-40.76 63.233-55.69 92.05-130.48 272.71-121.03 22.8-2.43 40.7-7.95 42.85-23.47-71.83 16.64-126.5-5.35-112.97-82.74l-246.09 86.45-14.933 16.05z" fillRule="evenodd" stroke="#000" strokeWidth="7.092" fill="#fff" />
              <path d="m-34.015 536.79l23.375 80.9-18.18 18.52-18.181 8.65-14.284 8.64-42.855-4.94-20.78-66.69 24.68-18.52 14.281-22.23 24.674-6.18 27.27 1.85z" fillRule="evenodd" stroke="#000" strokeWidth="7.092" />
              <path d="m-36.612 530c-0.239-24.29 11.201-44.25 72.722-45.7 106.99 1.14 143.37-27.93 183.1-55.57 22.71-5.95 29.07 11.05 31.17 24.7l-283.1 90.16-3.892-13.59z" fillRule="evenodd" stroke="#000" strokeWidth="7.092" fill="#fff" />
              <path d="m-30.119 542.97l20.778 77.19 905.12-319.88-18.18-55.57-907.72 297.64 0.001 0.62z" fillRule="evenodd" stroke="#000" strokeWidth="7.092" fill="#fff" />
              <path d="m878.25 243.47l5.85-8.03 155.8-15.43 32.5 5.55 11.7 11.12 7.1 17.91-2.6 16.67-7.1 9.26-10.4-3.7-5.2-12.97-12.3-3.09-8.5-0.62-86.33 48.79-20.13 1.85h-18.83l-12.34-8.64-7.14-4.33-22.08-54.34z" stroke="#000" strokeWidth="7.092" fillRule="evenodd" />
            </g>
          </svg>
          <h1>Riff</h1>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={loadSongs}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
            </svg>
          </button>
        </div>
      </header>

      <main className="app-main">
        {error ? (
          <div className="error-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={loadSongs}>Try Again</button>
          </div>
        ) : (
          <SongList
            songs={songs}
            currentSong={currentSong}
            onSongSelect={handleSongSelect}
            loading={loading}
          />
        )}
      </main>

      <Player currentSong={currentSong} songs={songs} onSongSelect={handleSongSelect} />
    </div>
  );
}

export default App;
