import React from 'react'
import { AiFillAudio } from "react-icons/ai";
import { FaCircleStop } from "react-icons/fa6";
import { CiPause1 } from "react-icons/ci";
import { VscDebugStart } from "react-icons/vsc";
import { useState, useEffect } from 'react';
import TimerUtils from '../Utils/TimerUtils';
import { startRecording, stopRecording, getAudioUrl, clearAudio, pauseRecording } from '../Utils/RecordVoiceUtils';
import { getAudioDuration, initializeAudio, playAudio, stopAudio, pauseAudio } from '../Utils/AudioUtils';

const AudioRecord = () => {
    const { startTimer, stopTimer, resetTimer, formatTime, displayTime } = TimerUtils();

    const [isRecording, setIsRecording] = useState(false);
    const [isStoped, setIsStoped] = useState(false);
    const [recordError, detectRecordError] = useState(false);
    const [yourAudio, setYourAudio] = useState('');
    const [isPlayable, setIsPlayable] = useState(false);
    const [audioDuration, setAudioDuration] = useState('0:00');
    let stopButtonColor = isStoped ? 'text-white' : 'text-red-500';

    useEffect(() => {
        if(yourAudio !== '') {
            setAudioPlayer();
        }
    }, [yourAudio]);

    const handleStartRecording = () => {
        clearAudio();
        setIsRecording(true);
        startRecording();
        startTimer();
    }

    const handleFinishRecording = async () => {
        setIsRecording(false);
        stopRecording();
        setIsStoped(false);

        const audioUrl = await getAudioUrl();
        console.log(audioUrl);
        if(!audioUrl) {
            detectRecordError(true);
            clearAudio();
            return
        }
        setYourAudio(audioUrl);
        clearAudio();
        resetTimer();
    }

    const handlePauseRecording = () => {
        if(isStoped) {
            setIsStoped(false);
            startRecording();
            startTimer();
            return;
        }
        setIsStoped(true);
        pauseRecording();
        stopTimer();
    }

    const setAudioPlayer = async () => {
        initializeAudio(yourAudio);
        setTimeout(() => {
            const audioDuration = getAudioDuration();
            const displayDuration = formatTime(audioDuration);
            setAudioDuration(displayDuration);
            setIsPlayable(true);
        }, 2000)
    }

    return (
    <>
        {isRecording ? 
            <div className="flex">
                <button type='button' className="bg-blue-950 py-2 px-3 rounded-full flex mr-2 hover:bg-blue-900" onClick={ handleFinishRecording }>
                    <FaCircleStop className={`${stopButtonColor} mt-0.5 mr-3 text-xl ${stopButtonColor}`} />
                    <span className='text-white'>{ displayTime }</span>
                </button>
                <button type='button' className="bg-blue-950 py-2 px-3 rounded-full hover:bg-blue-900" onClick={ handlePauseRecording }>
                    { isStoped ?
                        <VscDebugStart className='text-white font-bold text-lg' />
                        :
                        <CiPause1 className='text-white font-bold text-lg' />
                    }
                </button>
            </div>
            : 
            <button type='button' className="bg-blue-500 py-2 px-3 rounded-md focus:outline-none focus:shadow-outline text-white flex hover:bg-blue-400 mb-3" onClick={ handleStartRecording }>
                <AiFillAudio className='mt-0.5 mr-1 text-lg' />
                <span>
                    Start Now
                </span>
            </button>
        }
        {isPlayable ?
            <>
                <h3 className='text-gray-600 text-xs border-b-2 border-gray-200 mb-1 font-bold'>聞いてみる</h3>
                <button type="button" className='bg-cyan-500 py-2 px-3 rounded-full hover:bg-cyan-400 flex text-white text-md mb-0.5' onClick={ playAudio }>
                    <VscDebugStart className='mt-1 text-md mr-1' />
                    <span>Play</span>
                </button>
                <div className="flex justify-between">
                    <span className="text-md mr-2">{ displayTime }/{ audioDuration }</span>
                </div>
            </>
            :
            <></>
        }
    </>
    )
}

export default AudioRecord