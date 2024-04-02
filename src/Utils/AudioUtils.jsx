let audioInstance = null;

export const initializeAudio = (src) => {
    audioInstance = new Audio(src);
    console.log(audioInstance.src.duration);
    return audioInstance;
}

export const playAudio = () => {
    if(audioInstance) {
        console.log('play')
        audioInstance.play();
    }
}

export const pauseAudio = () => {
    if(audioInstance) {
        audioInstance.pause();
    }
}

export const stopAudio = () => {
    if(audioInstance) {
        audioInstance.pause();
    }
}

export const getAudioDuration = () => {
    const src = audioInstance.src;

    var request = new XMLHttpRequest();
    request.open('GET', src, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
        audioContext.decodeAudioData(request.response, function(buffer) {
            // Obtain the duration in seconds of the audio file (with milliseconds as well, a float value)
            var duration = buffer.duration;
    
            // example 12.3234 seconds
            console.log("The duration of the song is of: " + duration + " seconds");
            // Alternatively, just display the integer value with
            // parseInt(duration)
            // 12 seconds
        });
    };
};
