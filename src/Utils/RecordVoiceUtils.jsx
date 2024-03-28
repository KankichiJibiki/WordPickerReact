export let mediaRecorder;
let audioChunks = [];

export const startRecording = async () => {
    try {
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

        mediaRecorder = new MediaRecorder(audioStream);
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.start();
    } catch (err) {
        console.log(err);
    }
}

export const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
    }
}

export const handleDataAvailable = (event) => {
    console.log(event.data);
    audioChunks.push(event.data);
    console.log(audioChunks);
}

export const getAudioUrl = () => {
    console.log(audioChunks);
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    console.log(audioBlob.size);
    if(audioBlob.size == 0) {
        return false;
    }
    return URL.createObjectURL(audioBlob);
}

export const playRecording = () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
}

export const clearAudio = () => {
    console.log(audioChunks);
    audioChunks = [];
    console.log(audioChunks);
}
