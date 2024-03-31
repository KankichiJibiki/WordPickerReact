let audioInstance = null;

export const initializeAudio = (src) => {
    return audioInstance = new Audio(src);
}

export const playAudio = () => {
    if(audioInstance) {
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
            resolve(duration);
        };
        audioInstance.onerror = (error) => {
            reject(error);
        };
        audioInstance.src = audioUrl;
    });
};
