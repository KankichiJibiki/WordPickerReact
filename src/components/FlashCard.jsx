import React from 'react'
import Card from '../components/Card'
import { useState } from 'react'

const FlashCard = ({ wordList }) => {
    const [isViewAll, toggleView] = useState(false);

    return (
        <Card bg='bg-teal-100 mb-2'>
            <div className="p-2">
                <div className="mb-4">
                    <div className="text-gray-500 mb-1">{ wordList.type }</div>
                    <h3 className="text-xl font-bold">{ wordList.word }</h3>
                    <h3 className="text-sm text-gray-500">{ wordList.pronunciation.all }</h3>
                </div>

                <div className="mb-4">
                    <div className="text-md mb-2">{ wordList.definition_en }</div>
                    <div className="text-md">{ wordList.definition_jp }</div>
                </div>

                <div className="mb-4">
                    <div className="text-gray-600 text-sm border-b-2">Example</div>
                    <ul>
                        {
                            wordList.examples.map((ex, index) => (
                                <ol key={ index } className="text-md">{ ex }</ol>
                            ))
                        }
                    </ul>
                </div>

                <div className="hidden">
                    <div className="mb-4"></div>
                </div>

                <button onClick={ () => toggleView((prevState) => !prevState) } className='text-white bg-teal-600'>
                    {
                        isViewAll ? 'Less' : 'More'
                    }
                </button>
            </div>
        </Card>
    )
}

export default FlashCard