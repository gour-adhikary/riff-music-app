import { useState, useEffect, useRef } from 'react';
import './Player.css';

const Player = ({ currentSong, songs = [], onSongSelect }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        if (currentSong && audioRef.current) {
            // Handle both relative paths and absolute URLs
            const audioUrl = currentSong.audioUrl.startsWith('http')
                ? currentSong.audioUrl
                : `http://localhost:8080${currentSong.audioUrl}`;

            audioRef.current.src = audioUrl;
            audioRef.current.load();
            setIsPlaying(true);
            audioRef.current.play().catch(err => console.error('Playback error:', err));
        }
    }, [currentSong]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handleEnded = () => setIsPlaying(false);
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
        };
    }, [currentSong]); // Re-attach listeners when song changes

    const togglePlayPause = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(err => console.error('Playback error:', err));
        }
        // Don't manually toggle state - let the event listeners handle it
    };

    const handleSeek = (e) => {
        const seekTime = parseFloat(e.target.value);
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
        setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
        if (isMuted) {
            audioRef.current.volume = volume;
            setIsMuted(false);
        } else {
            audioRef.current.volume = 0;
            setIsMuted(true);
        }
    };

    const handlePrevious = () => {
        if (!currentSong || songs.length === 0 || !onSongSelect) return;

        const currentIndex = songs.findIndex(song => song.id === currentSong.id);
        if (currentIndex > 0) {
            onSongSelect(songs[currentIndex - 1]);
        } else {
            // Loop to last song
            onSongSelect(songs[songs.length - 1]);
        }
    };

    const handleNext = () => {
        if (!currentSong || songs.length === 0 || !onSongSelect) return;

        const currentIndex = songs.findIndex(song => song.id === currentSong.id);
        if (currentIndex < songs.length - 1) {
            onSongSelect(songs[currentIndex + 1]);
        } else {
            // Loop to first song
            onSongSelect(songs[0]);
        }
    };

    const formatTime = (time) => {
        if (isNaN(time)) return '0:00';
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

    if (!currentSong) {
        return (
            <div className="player-container empty">
                <div className="empty-player">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M9 18V5l12-2v13"></path>
                        <circle cx="6" cy="18" r="3"></circle>
                        <circle cx="18" cy="16" r="3"></circle>
                    </svg>
                    <p>Select a song to start playing</p>
                </div>
            </div>
        );
    }

    return (
        <div className="player-container">
            <audio ref={audioRef} />

            <div className="player-content">
                {/* Song Info */}
                <div className="player-song-info">
                    <div className="player-cover">
                        <img src={currentSong.coverImageUrl} alt={currentSong.title} />
                    </div>
                    <div className="player-details">
                        <div className="player-title">{currentSong.title}</div>
                        <div className="player-artist">{currentSong.artist}</div>
                    </div>
                </div>

                {/* Controls */}
                <div className="player-controls">
                    <div className="control-buttons">
                        <button className="control-btn" title="Previous" onClick={handlePrevious}>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                            </svg>
                        </button>

                        <button className="control-btn play-btn" onClick={togglePlayPause}>
                            {isPlaying ? (
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </button>

                        <button className="control-btn" title="Next" onClick={handleNext}>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                            </svg>
                        </button>
                    </div>

                    <div className="progress-container">
                        <span className="time-label">{formatTime(currentTime)}</span>
                        <div className="progress-bar-container">
                            <input
                                type="range"
                                min="0"
                                max={duration || 0}
                                value={currentTime}
                                onChange={handleSeek}
                                className="progress-bar"
                                style={{
                                    background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${progressPercentage}%, var(--surface-hover) ${progressPercentage}%, var(--surface-hover) 100%)`
                                }}
                            />
                        </div>
                        <span className="time-label">{formatTime(duration)}</span>
                    </div>
                </div>

                {/* Volume */}
                <div className="player-volume">
                    <button className="volume-btn" onClick={toggleMute}>
                        {isMuted || volume === 0 ? (
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                            </svg>
                        ) : volume < 0.5 ? (
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7 9v6h4l5 5V4l-5 5H7z" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                            </svg>
                        )}
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="volume-slider"
                    />
                </div>
            </div>
        </div>
    );
};

export default Player;
