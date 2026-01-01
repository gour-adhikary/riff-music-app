import { useState, useEffect } from 'react';
import './SongList.css';

const SongList = ({ songs, currentSong, onSongSelect, loading }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSongs = songs.filter(song =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (song.album && song.album.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const formatDuration = (seconds) => {
        if (!seconds) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (loading) {
        return (
            <div className="song-list-loading">
                <div className="spinner"></div>
                <p>Loading your music...</p>
            </div>
        );
    }

    return (
        <div className="song-list-container">
            <div className="song-list-header">
                <h2>Your Library</h2>
                <div className="search-bar">
                    <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    <input
                        type="text"
                        placeholder="Search songs, artists, albums..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="song-list">
                {filteredSongs.length === 0 ? (
                    <div className="empty-state">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M9 18V5l12-2v13"></path>
                            <circle cx="6" cy="18" r="3"></circle>
                            <circle cx="18" cy="16" r="3"></circle>
                        </svg>
                        <p>No songs found</p>
                    </div>
                ) : (
                    filteredSongs.map((song, index) => (
                        <div
                            key={song.id}
                            className={`song-item ${currentSong?.id === song.id ? 'active' : ''}`}
                            onClick={() => onSongSelect(song)}
                        >
                            <div className="song-number">{index + 1}</div>
                            <div className="song-cover">
                                <img src={song.coverImageUrl} alt={song.title} />
                                {currentSong?.id === song.id && (
                                    <div className="playing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                )}
                            </div>
                            <div className="song-info">
                                <div className="song-title">{song.title}</div>
                                <div className="song-artist">{song.artist}</div>
                            </div>
                            <div className="song-album">{song.album || 'Unknown Album'}</div>
                            <div className="song-duration">{formatDuration(song.duration)}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SongList;
