package com.riff.musicapp.service;

import com.riff.musicapp.model.Song;
import com.riff.musicapp.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SongService {

    @Autowired
    private SongRepository songRepository;

    public List<Song> getAllSongs() {
        return songRepository.findAll();
    }

    public Optional<Song> getSongById(Long id) {
        return songRepository.findById(id);
    }

    public Song createSong(Song song) {
        return songRepository.save(song);
    }

    public Song updateSong(Long id, Song songDetails) {
        Song song = songRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Song not found with id: " + id));
        
        song.setTitle(songDetails.getTitle());
        song.setArtist(songDetails.getArtist());
        song.setAlbum(songDetails.getAlbum());
        song.setDuration(songDetails.getDuration());
        song.setAudioUrl(songDetails.getAudioUrl());
        song.setCoverImageUrl(songDetails.getCoverImageUrl());
        
        return songRepository.save(song);
    }

    public void deleteSong(Long id) {
        songRepository.deleteById(id);
    }

}
