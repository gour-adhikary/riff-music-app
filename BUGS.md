# Bug Tracker - Riff Music App

This document tracks all bugs encountered during development and their solutions.

---

## Bug #1: Songs Not Playing - No Audio URLs

**Date**: 2026-01-01  
**Severity**: Critical  
**Status**: ✅ Fixed

### Problem
When clicking on a song in the song list, the audio player would not play any sound. The player appeared to load but no audio was heard.

### Root Cause
The `DataInitializer.java` was using placeholder file paths for audio files (e.g., `/audio/bohemian-rhapsody.mp3`), but these files did not actually exist on the backend server. The audio element was trying to load non-existent resources.

### Solution
1. **Updated DataInitializer.java** - Changed audio URLs from local file paths to publicly available test audio URLs from SoundHelix:
   ```java
   // Before:
   "/audio/bohemian-rhapsody.mp3"
   
   // After:
   "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
   ```

2. **Updated Player.jsx** - Modified to handle both relative paths (for backend streaming) and absolute URLs (for external audio):
   ```javascript
   const audioUrl = currentSong.audioUrl.startsWith('http') 
       ? currentSong.audioUrl 
       : `http://localhost:8080${currentSong.audioUrl}`;
   ```

### Files Changed
- `backend/src/main/java/com/riff/musicapp/config/DataInitializer.java`
- `frontend/src/components/Player.jsx`

### Future Recommendation
For production use with real music files:
1. Create directory: `backend/src/main/resources/static/audio/`
2. Place MP3 files in this directory
3. Update `DataInitializer.java` to use paths like `/audio/your-song.mp3`
4. Spring Boot will automatically serve files from the `static` directory

---

## Bug #2: Progress Bar Not Updating During Playback

**Date**: 2026-01-01  
**Severity**: High  
**Status**: ✅ Fixed

### Problem
The audio plays, but the progress bar does not update as the song progresses. Users cannot see the current playback position and the seek functionality doesn't work properly. The time display remains at 0:00.

### Root Cause
The issue had multiple causes:

1. **Missing Event Listeners**: The `play` and `pause` event listeners were not attached to the audio element, causing the `isPlaying` state to become out of sync with the actual playback state.

2. **Wrong useEffect Dependency**: The event listeners were only attached once on mount (`[]` dependency), not when the song changed. This meant when a new song was selected, the old listeners weren't cleaned up and new ones weren't attached.

3. **Manual State Toggle**: The `togglePlayPause` function was manually toggling the `isPlaying` state with `setIsPlaying(!isPlaying)`, which could cause race conditions and state desynchronization.

### Solution
1. **Added Event Listeners** for `play` and `pause` events:
   ```javascript
   const handlePlay = () => setIsPlaying(true);
   const handlePause = () => setIsPlaying(false);
   audio.addEventListener('play', handlePlay);
   audio.addEventListener('pause', handlePause);
   ```

2. **Changed useEffect Dependency** from `[]` to `[currentSong]`:
   ```javascript
   }, [currentSong]); // Re-attach listeners when song changes
   ```

3. **Removed Manual State Toggle** - Let event listeners handle state:
   ```javascript
   const togglePlayPause = () => {
       if (!audioRef.current) return;
       if (isPlaying) {
           audioRef.current.pause(); // Triggers 'pause' event
       } else {
           audioRef.current.play(); // Triggers 'play' event
       }
       // Don't manually toggle state - let the event listeners handle it
   };
   ```

### Files Changed
- `frontend/src/components/Player.jsx`

### Result
- ✅ Progress bar now updates in real-time as the song plays
- ✅ Time display shows current position and total duration
- ✅ Seek bar is draggable and updates playback position
- ✅ Play/pause state stays in sync with actual audio playback
- ✅ Switching songs properly resets and reattaches event listeners

---

## Bug #3: Next/Previous Song Buttons Not Working

**Date**: 2026-01-01  
**Severity**: Medium  
**Status**: ✅ Fixed

### Problem
The Previous and Next song buttons in the player were visible but non-functional. Clicking them had no effect - they didn't navigate to the previous or next song in the playlist.

### Root Cause
The buttons had no `onClick` event handlers attached. The Player component also didn't have access to:
1. The full list of songs to navigate through
2. A callback function to update the current song in the parent component

### Solution
1. **Updated Player Component Props** to accept songs array and navigation callback:
   ```javascript
   const Player = ({ currentSong, songs = [], onSongSelect }) => {
   ```

2. **Implemented Navigation Functions** with loop-around behavior:
   ```javascript
   const handlePrevious = () => {
       if (!currentSong || songs.length === 0 || !onSongSelect) return;
       const currentIndex = songs.findIndex(song => song.id === currentSong.id);
       if (currentIndex > 0) {
           onSongSelect(songs[currentIndex - 1]);
       } else {
           onSongSelect(songs[songs.length - 1]); // Loop to last
       }
   };

   const handleNext = () => {
       if (!currentSong || songs.length === 0 || !onSongSelect) return;
       const currentIndex = songs.findIndex(song => song.id === currentSong.id);
       if (currentIndex < songs.length - 1) {
           onSongSelect(songs[currentIndex + 1]);
       } else {
           onSongSelect(songs[0]); // Loop to first
       }
   };
   ```

3. **Attached onClick Handlers** to the buttons:
   ```javascript
   <button className="control-btn" title="Previous" onClick={handlePrevious}>
   <button className="control-btn" title="Next" onClick={handleNext}>
   ```

4. **Updated App Component** to pass required props:
   ```javascript
   <Player currentSong={currentSong} songs={songs} onSongSelect={handleSongSelect} />
   ```

### Files Changed
- `frontend/src/components/Player.jsx`
- `frontend/src/App.jsx`

### Result
- ✅ Previous button navigates to the previous song in the list
- ✅ Next button navigates to the next song in the list
- ✅ Both buttons loop around (last → first, first → last)
- ✅ Navigation works seamlessly with automatic playback of the new song

---

## Bug #4: Next Button Icon Displayed Inverted

**Date**: 2026-01-01  
**Severity**: Low (Visual)  
**Status**: ✅ Fixed

### Problem
The Next song button icon was displaying backwards/inverted, making it look like it was pointing in the wrong direction.

### Root Cause
The SVG path for the Next button icon was incorrect. The path `d="M16 18h2V6h-2zm-11-7l8.5-6v12z"` was drawing the icon facing the wrong direction.

### Solution
Updated the SVG path to the correct forward-facing icon:
```javascript
// Before (inverted):
<path d="M16 18h2V6h-2zm-11-7l8.5-6v12z" />

// After (correct):
<path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
```

### Files Changed
- `frontend/src/components/Player.jsx` (line 172)

### Result
- ✅ Next button icon now displays correctly pointing forward (→)
- ✅ Matches the visual direction of the Previous button (←)

---

## Bug #5: Generic Page Title and Vite Logo

**Date**: 2026-01-01  
**Severity**: Low (Branding)  
**Status**: ✅ Fixed

### Problem
The browser tab shows "frontend" as the page title and displays the default Vite logo instead of a custom Riff logo. This makes the app look generic and unprofessional.

### Root Cause
The default Vite template was used, which includes:
1. Generic page title "frontend" in `index.html`
2. Default Vite favicon in the public folder
3. Generic music note icon in the header instead of a custom guitar logo

### Solution
1. **Updated Page Title** in `index.html`:
   ```html
   <title>Riff - Music Streaming App</title>
   ```

2. **Created Custom Electric Guitar Logo** - Replaced the music note icon with a simplistic electric guitar SVG in the header

3. **Generated Custom Favicon** - Created a pink guitar favicon to match the app branding

### Files Changed
- `frontend/index.html`
- `frontend/src/App.jsx` (logo SVG)
- `frontend/public/favicon.ico` (or favicon.svg)

### Result
- ✅ Browser tab now shows "Riff - Music Streaming App"
- ✅ Custom electric guitar logo in header
- ✅ Branded favicon in browser tab
- ✅ Professional, cohesive branding throughout the app

---

## Template for New Bugs

```markdown
## Bug #X: [Bug Title]

**Date**: YYYY-MM-DD  
**Severity**: [Critical/High/Medium/Low]  
**Status**: [🔍 Investigating / 🔧 In Progress / ✅ Fixed / ❌ Won't Fix]

### Problem
[Description of the bug and how to reproduce it]

### Root Cause
[What caused the bug]

### Solution
[How it was fixed]

### Files Changed
- [List of files modified]

### Notes
[Any additional information]
```
