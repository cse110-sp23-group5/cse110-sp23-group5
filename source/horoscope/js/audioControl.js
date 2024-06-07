document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('background-music');
    const audioControlBtn = document.getElementById('audio-control-button');
    // The fallback ensures that if the icon isn't found (e.g., on pages other than the landing page), the code won't throw an error when trying to access audioIcon.src.
    const audioIcon = document.getElementById('audio-icon') || { src: '' }; // Fallback if not present

    /*
        This function checks the current state of audio playback and initializes the audio accordingly. 
        It distinguishes between first-time site visits, page reloads, and normal page navigation.
     */
    function initializeAudio() {
        /*
            If there is no saved audio state or time in localStorage, implying a first-time visit or data has been manually cleared.
            Resets the audio to the beginning, pauses it, and sets the icon to "off".
         */
        if (!localStorage.getItem('audioState') && !localStorage.getItem('audioTime')) {
            audio.pause();
            audio.currentTime = 0;
            audioIcon.src = '../images/audio_off.png';
        }
        /*
            If the current page load is due to a reload (using window.performance.navigation.type).
            Clears any saved state in localStorage, resets and pauses the audio, and sets the icon to "off". This ensures a fresh start after a reload.
         */
        else if (window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD || window.performance.navigation.type === 1) { // Some browsers use 1 instead of the named constant
            localStorage.removeItem('audioState');
            localStorage.removeItem('audioTime');
            audio.pause();
            audio.currentTime = 0;
            if (audioIcon) audioIcon.src = '../images/audio_off.png';
        }
        /*
            On normal navigations (not a reload), it retrieves the saved state.
            Sets the audio playback to the last known time and either plays or pauses the audio based on the last known state, updating the icon accordingly.
         */
        else {
            const audioState = localStorage.getItem('audioState');
            const savedTime = parseFloat(localStorage.getItem('audioTime')) || 0;
            audio.currentTime = savedTime;

            if (audioState === 'playing') {
                audio.play();
                audioIcon.src = '../images/audio_on.png';
            } else {
                audio.pause();
                audioIcon.src = '../images/audio_off.png';
            }
        }
    }

    // Toggle audio on landing page
    /*
        Adds functionality to the audio control button on the landing page to toggle the playback state. 
        It updates localStorage with the new state and the current time of the audio.
     */
    if (audioControlBtn) {
        audioControlBtn.style.display = 'block'; // Ensure the control button is visible only on the landing page
        audioControlBtn.addEventListener('click', function() {
            if (audio.paused) {
                audio.play();
                audioIcon.src = '../images/audio_on.png';
                localStorage.setItem('audioState', 'playing');
                localStorage.setItem('audioTime', audio.currentTime);
            } else {
                audio.pause();
                audioIcon.src = '../images/audio_off.png';
                localStorage.setItem('audioState', 'paused');
            }
        });
    }

    initializeAudio();

    // Save the playback time if navigating away, but not on reloads
    /*
        Before the user leaves the current page, this code saves the current time of the audio to localStorage if the audio is not paused. 
        This allows resuming from the same point on subsequent page navigations.
     */
    window.addEventListener('beforeunload', function() {
        if (!audio.paused) {
            localStorage.setItem('audioTime', audio.currentTime);
        }
    });
})