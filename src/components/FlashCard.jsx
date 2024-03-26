import React from 'react'
import Card from '../components/Card'
import { useState } from 'react'
import { GrCaretDown, GrCaretUp  } from "react-icons/gr";
import { GiSpeaker } from "react-icons/gi";

const FlashCard = ({ wordList }) => {
    const [isViewAll, toggleView] = useState(false);

    return (
        <Card bg='bg-teal-100 mb-2'>
            <div className="p-2">
                <div className="mb-3 border-b border-teal-600">
                    <div className="mb-4">
                        <div className="text-gray-500 mb-1">{ wordList.type }</div>
                        <h3 className="text-xl font-bold">{ wordList.word }</h3>
                        <div className='flex'>
                            <h3 className="text-sm text-gray-500 mr-1">{ wordList.pronunciation.all }</h3>
                            <button className="hover:text-gray-700">
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
                        <ul>
                            {
                                wordList.examples.map((ex, index) => (
                                    <ol key={ index } className="text-sm">{ ex }</ol>
                                ))
                            }
                        </ul>
                    </div>

                    <div hidden={ isViewAll ? false : true }>
                        <div className="mb-4">
                            <div className="text-gray-600 text-sm border-b-2">Synonyms</div>
                            <ul>
                                {
                                    wordList.synonyms.map((synonym, index) => (
                                        <li key={index}>{ synonym }</li>
                                    ))
                                }
                            </ul>
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