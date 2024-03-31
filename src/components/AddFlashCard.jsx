import React from 'react'
import { WordTypes } from '../constants/WordTypes';
import { useState } from 'react';
import { IoAddCircle } from "react-icons/io5";
import { CiTrash } from "react-icons/ci";
import { AppConfigs } from '../constants/AppConfigs';
import AudioRecord from './AudioRecord';
import { initializeAudio, playAudio, stopAudio } from '../Utils/AudioUtils';

const AddFlashCard = ({ isSignedUp }) => {
    const wordTypes = WordTypes();
    const typeKeys = Object.keys(wordTypes);

    const [word, setWord] = useState('');
    const [type, setType] = useState('');
    const [definition_en, setEnDefinition] = useState([{ definitionEn: '' }]);
    const [definition_jp, setJPDefinition] = useState([{ definitionJp: '' }]);
    const [synonyms, setSynonyms] = useState([{ synonym: '' }]);
    const [examples, setExamples] = useState([{ example: '' }]);
    const [pronunciation, setPronunciation] = useState([]);


    const registerFlashCard = (e) => {
        console.log(e);
    }

    const setValueToMultiInputHelper = (inputType, value, index) => {
        switch(inputType) {
            case 'definition_en': 
                setValueToMultiInput(setEnDefinition, 'definitionEn', value, index);
                break;
            case 'definition_jp': 
                setValueToMultiInput(setJPDefinition, 'definitionJp', value, index);
                break;
            case 'examples': 
                setValueToMultiInput(setExamples, 'example', value, index);
                break;
            case 'synonyms': 
                setValueToMultiInput(setSynonyms, 'synonym', value, index);
                break;
            default: 
                console.log('Invalid adding value into input');
                break;
        }
    };

    const setValueToMultiInput = (inputState, key, value, index) => {
        inputState(prevInputs => {
            const updatedInputs = [...prevInputs];
            updatedInputs[index] = { ...updatedInputs[index], [key]: value };
            return updatedInputs;
        });
    }

    const addInput = (inputType) => {
        switch(inputType) {
            case 'definition_en': 
                setNewInput(definition_en, setEnDefinition, 'definitionEn');
                break;
            case 'definition_jp': 
                setNewInput(definition_jp, setJPDefinition, 'definitionJp');
                break;
            case 'examples': 
                setNewInput(examples, setExamples, 'example');
                break;
            case 'synonyms': 
                setNewInput(synonyms, setSynonyms, 'synonym');
                break;
            default: 
                console.log('Invalid adding inputs');
                break;
        }
    }

    const deleteInput = (inputType, index) => {
        switch(inputType) {
            case 'definition_en': 
                removeInput(definition_en, setEnDefinition, index);
                break;
            case 'definition_jp': 
                removeInput(definition_jp, setJPDefinition, index);
                break;
            case 'examples': 
                removeInput(examples, setExamples, index);
                break;
            case 'synonyms': 
                removeInput(synonyms, setSynonyms, index);
                break;
            default: 
                console.log('Invalid deleting inputs');
                break;
        }
    }

    const setNewInput = (inputs, setInputs, key) => {
        if(isMaximumInput(inputs)) {
            return;
        }
        const newInput = { [key] : '' };
        setInputs([...inputs, newInput]);
    }

    const removeInput = (inputs, setInputs, index) => {
        if(isMinimumInput(inputs)) {
            return;
        }
        const newInputs = inputs.filter((value, i) => {
            if(i != index) return value;
        });
        setInputs(newInputs);
    }

    const isMaximumInput = (input) => {
        return input.length >= AppConfigs.maximumInputs;
    }

    const isMinimumInput = (input) => {
        return input.length <= AppConfigs.minimumInputs;
    }

    return (
    <section className="bg-teal-50">
        <div className="container m-auto max-w-3xl py-20">
            <div
            className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
            >
                <form>
                    <h2 className="text-2xl text-center font-bold mb-8">
                        Add Flash Card
                    </h2>

                    <div className='flex justify-between mb-6'>
                        <section className='w-full mx-4'>
                            <div className="mb-4">
                                <div className="flex mb-2">
                                    <label htmlFor="word" className='block text-gray-700 font-bold mr-2'>Word</label>
                                    <span className='bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300'>必須</span>
                                </div>
                                <input 
                                    type="text" 
                                    id='word' 
                                    name='word' 
                                    className='border border-gray-300 rounded w-full py-2 px-3 mb-2' 
                                    placeholder='eg. promising'
                                    required
                                    value={ word }
                                    onChange={(e) => setWord(e.target.value)}
                                />
                            </div>

                            <div className="mb-4">
                                <div className="flex mb-2">
                                    <label htmlFor="type" className='block text-gray-700 font-bold mr-2'>Word Type</label>
                                    <span className='bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300'>必須</span>
                                </div>
                                <select 
                                    name="type" 
                                    id="type" 
                                    className='border border-gray-300 rounded w-full py-2 px-3 mb-2' 
                                    required
                                    value={ type }
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    {
                                        typeKeys.map((type, index) => (
                                            <option key={ index } value={ type }>
                                                { wordTypes[type] }
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="mb-4">
                                <div className="flex mb-2">
                                    <label className='block text-gray-700 font-bold mr-2'>
                                        英語での意味
                                    </label>
                                    <span className='bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300'>必須</span>
                                </div>
                                {definition_en.map((input, index) => (
                                    <div className="flex mb-2" key={ index }>
                                        <span className='text-md text-gray-400 mr-2 my-auto'>
                                            { index + 1 }
                                        </span>
                                        <input 
                                            type="text" 
                                            id={ `definition_en_${index}` } 
                                            name={ `definition_en_${index}` } 
                                            className='border border-gray-300 rounded w-full py-2 px-3' 
                                            placeholder='eg. bright'
                                            required
                                            value={ input.definitionEn }
                                            onChange={(e) => setValueToMultiInputHelper('definition_en', e.target.value, index)}
                                        />
                                        <CiTrash 
                                            className='text-2xl hover:text-red-500 hover:cursor-pointer my-auto ml-1' 
                                            onClick={ () => deleteInput('definition_en', index) }
                                        />
                                    </div>
                                ))}
                                
                                <IoAddCircle 
                                    className='text-2xl hover:text-gray-400 hover:cursor-pointer ml-auto mr-7' 
                                    onClick={ () => addInput('definition_en') }
                                />
                            </div>

                            <div className="mb-4">
                                <div className="flex mb-2">
                                    <label className='block text-gray-700 font-bold mr-2'>日本語での意味</label>
                                    <span className='bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300'>必須</span>
                                </div>
                                {definition_jp.map((input, index) => (
                                    <div className="flex mb-2" key={ index }>
                                        <span className='text-md text-gray-400 mr-2 my-auto'>
                                            { index + 1 }
                                        </span>
                                        <input 
                                            type="text" 
                                            id={ `definition_jp_${index}` } 
                                            name={ `definition_jp_${index}` } 
                                            className='border border-gray-300 rounded w-full py-2 px-3' 
                                            placeholder='eg. 将来有望な'
                                            required
                                            value={ input.definitionJp }
                                            onChange={(e) => setValueToMultiInputHelper('definition_jp', e.target.value, index)}
                                        />
                                        <CiTrash 
                                            className='text-2xl hover:text-red-500 hover:cursor-pointer my-auto ml-1' 
                                            onClick={ () => deleteInput('definition_jp', index) }
                                        />
                                    </div>
                                ))}
                                
                                <IoAddCircle 
                                    className='text-2xl hover:text-gray-400 hover:cursor-pointer ml-auto mr-7' 
                                    onClick={ () => addInput('definition_jp') }
                                />
                            </div>
                        </section>

                        <section className="w-full mx-4">
                            <div className="mb-4">
                                <div className="mb-2">
                                    <label className='block text-gray-700 font-bold mb-2'>類義語</label>
                                </div>
                                {synonyms.map((input, index) => (
                                    <div className="flex mb-2" key={ index }>
                                        <span className='text-md text-gray-400 mr-2 my-auto'>
                                            { index + 1 }
                                        </span>
                                        <input 
                                            type="text" 
                                            id={ `synonyms_${index}` } 
                                            name={ `synonyms_${index}` } 
                                            className='border border-gray-300 rounded w-full py-2 px-3' 
                                            placeholder='eg. hopeful'
                                            required
                                            value={ input.synonym }
                                            onChange={(e) => setValueToMultiInputHelper('synonyms', e.target.value, index)}
                                        />
                                        <CiTrash 
                                            className='text-2xl hover:text-red-500 hover:cursor-pointer my-auto ml-1' 
                                            onClick={ () => deleteInput('synonyms', index) }
                                        />
                                    </div>
                                ))}
                                
                                <IoAddCircle 
                                    className='text-2xl hover:text-gray-400 hover:cursor-pointer ml-auto mr-7' 
                                    onClick={ () => addInput('synonyms') }
                                />
                            </div>

                            <div className="mb-4">
                                <div className="mb-2">
                                    <label className='block text-gray-700 font-bold mb-2'>使用例</label>
                                </div>
                                {examples.map((input, index) => (
                                    <div className="flex mb-2" key={ index }>
                                        <span className='text-md text-gray-400 mr-2 my-auto'>
                                            { index + 1 }
                                        </span>
                                        <input 
                                            type="text" 
                                            id={ `examples_${index}` } 
                                            name={ `examples_${index}` } 
                                            className='border border-gray-300 rounded w-full py-2 px-3' 
                                            placeholder='eg. the scandal threatened an abrupt end to a promising political career'
                                            required
                                            value={ input.example }
                                            onChange={(e) => setValueToMultiInputHelper('examples', e.target.value, index)}
                                        />
                                        <CiTrash 
                                            className='text-2xl hover:text-red-500 hover:cursor-pointer my-auto ml-1' 
                                            onClick={ () => deleteInput('examples', index) }
                                        />
                                    </div>
                                ))}
                                
                                <IoAddCircle 
                                    className='text-2xl hover:text-gray-400 hover:cursor-pointer ml-auto mr-7' 
                                    onClick={ () => addInput('examples') }
                                />
                            </div>
                            
                            <div className="mb-2">
                                <div className="text-gray-700 font-bold mb-2">
                                    録音をする
                                </div>
                                <AudioRecord />
                            </div>
                        </section>
                    </div>

                    <div className='text-center'>
                        <button className="bg-teal-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline hover:bg-teal-400" type='button' onClick={ registerFlashCard }>
                            Add Flash Card
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default AddFlashCard