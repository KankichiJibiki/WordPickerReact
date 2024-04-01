let audioInstance = null;

export const initializeAudio = (src) => {
    audioInstance = new Audio(src);
    audioInstance.currentTime = 24*60*60;
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
        audioInstance.currentTime = 0;
    }
}

export const getAudioDuration = () => {
    return new Promise((resolve, reject) => {
        audioInstance.onloadedmetadata = () => {
            const duration = audioInstance.duration;
            console.log(audioInstance);
            console.log(duration);
            resolve(duration);
        };
        audioInstance.onerror = (error) => {
            reject(error);
        };
    });
};
