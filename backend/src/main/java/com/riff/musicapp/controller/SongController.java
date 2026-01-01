package com.riff.musicapp.controller;

import com.riff.musicapp.model.Song;
import com.riff.musicapp.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/songs")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class SongController {

    @Autowired
    private SongService songService;

    @GetMapping
    public ResponseEntity<List<Song>> getAllSongs() {
        List<Song> songs = songService.getAllSongs();
        return ResponseEntity.ok(songs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Song> getSongById(@PathVariable Long id) {
        return songService.getSongById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Song> createSong(@RequestBody Song song) {
        Song createdSong = songService.createSong(song);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSong);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Song> updateSong(@PathVariable Long id, @RequestBody Song song) {
        try {
            Song updatedSong = songService.updateSong(id, song);
            return ResponseEntity.ok(updatedSong);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSong(@PathVariable Long id) {
        songService.deleteSong(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/stream")
    public ResponseEntity<Resource> streamSong(@PathVariable Long id) {
        try {
            Song song = songService.getSongById(id)
                    .orElseThrow(() -> new RuntimeException("Song not found"));

            // For now, we'll use the audioUrl directly
            // In production, you'd want to serve from a local directory
            Path filePath = Paths.get(song.getAudioUrl());
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType("audio/mpeg"))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + song.getTitle() + ".mp3\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
