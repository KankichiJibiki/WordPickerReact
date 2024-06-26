let audioInstance = null;

export const initializeAudio = (src) => {
    return (audioInstance = new Audio(src));
};

export const playAudio = () => {
    if (audioInstance) {
        audioInstance.play();
    }
};

export const pauseAudio = () => {
    if (audioInstance) {
        audioInstance.pause();
    }
};

export const stopAudio = () => {
    if (audioInstance) {
        audioInstance.pause();
    }
};

export const getAudioDuration = async () => {
    let audioDuration = 0;
    const audioFile = audioInstance.src;
    const audioContext = new window.AudioContext();

    const res = await fetch(audioFile);
    const arrayBuffer = await res.arrayBuffer();

    await audioContext.decodeAudioData(arrayBuffer, ({ duration }) => {
        audioDuration = Math.floor(duration);
    });
    return audioDuration;
};
