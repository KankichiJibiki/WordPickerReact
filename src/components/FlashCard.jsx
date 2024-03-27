import React from 'react'
import Card from '../components/Card'
import { useState } from 'react'
import { GrCaretDown, GrCaretUp  } from "react-icons/gr";
import { GiSpeaker } from "react-icons/gi";
import { AiFillAudio } from "react-icons/ai";
import { FaStopCircle } from "react-icons/fa";
import { initializeAudio, playAudio, stopAudio } from '../Utils/AudioUtils';
import { WordTypes } from '../constants/WordTypes';

const FlashCard = ({ wordList }) => {
    const [isViewAll, toggleView] = useState(false);
    const [isRecording, toggleRecord] = useState(false);

    const wordTypes = WordTypes();
    const exAudioExists = wordList.exampleAudio === '' ? false : true;
    const usersAudioExists = wordList.yourAudio === '' ? false : true;
    let badgeStyle = 'bg-yellow-100 text-yellow-800 font-medium dark:bg-yellow-900 dark:text-yellow-300';
    if(!usersAudioExists) {
        badgeStyle = 'bg-blue-100 text-blue-800 font-medium dark:bg-blue-900 dark:text-blue-300';
    }

    const domain = window.location.origin;
    const audiosPath = `${domain}/src/assets/audios/`;
    const playPronunciation = () => {
        if(!exAudioExists) return;

        const audioSrc = initializeAudio(audiosPath + wordList.exampleAudio);
        if(audioSrc) {
            stopAudio();
            playAudio();
        }
    }

    return (
        <Card bg='bg-teal-100 mb-2'>
            <div className="p-2">
                <div className="mb-3 border-b border-teal-600">
                    <div className="mb-4">
                        <div className="text-gray-500 mb-1">
                            <span className='mr-1'>
                                { wordList.type } - 
                            </span>
                            <span>
                                { wordTypes[wordList.type] }
                            </span>
                        </div>
                        <h3 className="text-xl font-bold">{ wordList.word }</h3>
                        <div className='flex'>
                            <h3 className="text-sm text-gray-500 mr-1">{ wordList.pronunciation.all }</h3>
                            <button className="hover:text-gray-500" onClick={ playPronunciation }>
                                <GiSpeaker />
                            </button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="text-sm mb-2">
                            <span className='font-bold'>EN: </span>{ wordList.definition_en }
                        </div>
                        <div className="text-sm">
                            <span className='font-bold'>JP: </span>{ wordList.definition_jp }
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="text-gray-600 text-sm border-b-2">Examples</div>
                        <ol className='list-decimal'>
                            {
                                wordList.examples.map((ex, index) => (
                                    <li key={ index } className="text-sm">{ ex }</li>
                                ))
                            }
                        </ol>
                    </div>

                    <div hidden={ isViewAll ? false : true }>
                        <div className="mb-6">
                            <div className="text-gray-600 text-sm border-b-2">Synonyms</div>
                            <ul className='list-disc'>
                                {
                                    wordList.synonyms.map((synonym, index) => (
                                        <li key={index}>{ synonym }</li>
                                    ))
                                }
                            </ul>
                        </div>

                        <div className='mb-4'>
                            <div className="text-gray-600 text-sm border-b-2 pb-1">
                                <span className='mr-1'>
                                    Your audio
                                </span>
                                <span className={ `${badgeStyle} text-xs rounded me-2 px-2.5 py-0.5` }>
                                    { usersAudioExists ? 'Registered' : 'Not yet' }
                                </span>
                            </div>
                            <div className="my-2">
                                <audio 
                                    controls 
                                    src={ wordList.yourAudio } 
                                    className='w-full h-9'
                                ></audio>

                                <div className="flex justify-between my-6">
                                    <div className="flex">
                                        <span className='text-xs mr-1 mt-0.5'>
                                            {
                                                isRecording ? '停止する' : 'レコードする'
                                            }
                                        </span>
                                        <button 
                                            className='hover:text-gray-600' 
                                            onClick={ () => toggleRecord((prevState) => !prevState)} 
                                        >
                                            {
                                                isRecording ? <FaStopCircle className='text-red-600' /> : <AiFillAudio />
                                            }
                                        </button>
                                    </div>
                                    <div className="text-sm text-gray-700 mr-7">
                                        0:00
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button onClick={ () => toggleView((prevState) => !prevState) } className='flex justify-between text-white bg-black text-center hover:bg-gray-700 text-xs p-1 ml-auto rounded-md'>
                    <span className='mr-1'>
                        {
                            isViewAll ? 'Less' : 'More'
                        }
                    </span>
                    <span className='mt-0.5'>
                        {
                            isViewAll ? <GrCaretUp /> : <GrCaretDown />
                        }
                    </span>
                </button>
            </div>
        </Card>
    )
}

export default FlashCard