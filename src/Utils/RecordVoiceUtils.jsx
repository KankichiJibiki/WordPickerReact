let mediaRecorder;
let audioChunks = [];
let onStopPromiseResolve = null;

export const startRecording = async () => {
    try {
        const audioStream = await navigator.mediaDevices.getUserMedia({
            audio: true
        });

        mediaRecorder = new MediaRecorder(audioStream);
        mediaRecorder.ondataavailable = handleDataAvailable;
        onStopPromiseResolve = null;
        mediaRecorder.onstop = () =>
            onStopPromiseResolve && onStopPromiseResolve();
        mediaRecorder.start();
    } catch (err) {
        console.log(err);
    }
};

export const pauseRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.pause();
    }
};

export const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.pause();
        mediaRecorder.stop();
    }
};

export const handleDataAvailable = (event) => {
    audioChunks.push(event.data);
};

export const getAudioUrl = async () => {
    await new Promise((resolve) => {
        onStopPromiseResolve = resolve;
    });

    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    if (audioBlob.size == 0) {
        return false;
    }
    return URL.createObjectURL(audioBlob);
};

export const playRecording = () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
};

export const clearAudio = () => {
    audioChunks = [];
};
