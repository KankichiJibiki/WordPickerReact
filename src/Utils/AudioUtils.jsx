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
