package com.riff.musicapp.config;

import com.riff.musicapp.model.Song;
import com.riff.musicapp.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private SongRepository songRepository;

    @Override
    public void run(String... args) throws Exception {
        // Add sample songs for testing
        // Using publicly available test audio files
        if (songRepository.count() == 0) {
            songRepository.save(new Song(null, "Bohemian Rhapsody", "Queen", "A Night at the Opera", 354, 
                    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", "https://picsum.photos/seed/queen/300/300"));
            
            songRepository.save(new Song(null, "Stairway to Heaven", "Led Zeppelin", "Led Zeppelin IV", 482, 
                    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", "https://picsum.photos/seed/zeppelin/300/300"));
            
            songRepository.save(new Song(null, "Hotel California", "Eagles", "Hotel California", 391, 
                    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", "https://picsum.photos/seed/eagles/300/300"));
            
            songRepository.save(new Song(null, "Imagine", "John Lennon", "Imagine", 183, 
                    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", "https://picsum.photos/seed/lennon/300/300"));
            
            songRepository.save(new Song(null, "Sweet Child O' Mine", "Guns N' Roses", "Appetite for Destruction", 356, 
                    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", "https://picsum.photos/seed/gnr/300/300"));

            System.out.println("Sample songs initialized with test audio URLs!");
        }
    }

}
