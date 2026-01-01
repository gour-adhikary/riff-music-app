// API Base URL - uses environment variable in production, localhost in development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const songService = {
    // Get all songs
    getAllSongs: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/songs`);
            if (!response.ok) {
                throw new Error('Failed to fetch songs');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching songs:', error);
            throw error;
        }
    },

    // Get song by ID
    getSongById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/songs/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch song');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching song:', error);
            throw error;
        }
    },

    // Get stream URL for a song
    getStreamUrl: (id) => {
        return `${API_BASE_URL}/songs/${id}/stream`;
    },

    // Create a new song
    createSong: async (songData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/songs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(songData),
            });
            if (!response.ok) {
                throw new Error('Failed to create song');
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating song:', error);
            throw error;
        }
    },

    // Update a song
    updateSong: async (id, songData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/songs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(songData),
            });
            if (!response.ok) {
                throw new Error('Failed to update song');
            }
            return await response.json();
        } catch (error) {
            console.error('Error updating song:', error);
            throw error;
        }
    },

    // Delete a song
    deleteSong: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/songs/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete song');
            }
        } catch (error) {
            console.error('Error deleting song:', error);
            throw error;
        }
    },

    // Format duration from seconds to MM:SS
    formatDuration: (seconds) => {
        if (!seconds) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    },
};
