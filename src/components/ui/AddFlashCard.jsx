import { WordTypes } from '../../constants/WordTypes';
import { useState, useEffect } from 'react';
import { IoAddCircle } from "react-icons/io5";
import { LuBookUp } from "react-icons/lu";
import { CiTrash } from "react-icons/ci";
import { MdAutorenew } from "react-icons/md";
import { AppConfigs } from '../../constants/AppConfigs';
import { RiArrowGoBackLine } from "react-icons/ri";
import AudioRecord from './AudioRecord';
import FlashCardFeatures from '../../features/FlashCardFeatures';
import BeatLoader from '../BeatLoads';
import ArrayHelpers from '../../Utils/ArrayHelpers';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import Spinner from '../Spinner';


const AddFlashCard = ({ isSignedUp = false, addSampleFlashCard = null }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const wordTypes = WordTypes();

    const [word, setWord] = useState('');
    const [type, setType] = useState('');
    const [typeList, setTypeList] = useState(Object.keys(wordTypes));
    const [definition_en, setEnDefinition] = useState('');
    const [definition_en_select, setEnSelectDefinition] = useState([]);
    const [definition_jp, setJPDefinition] = useState('');
    const [definition_jp_select, setJPSelectDefinition] = useState([]);
    const [self_enter_en, setSelfEnterEn] = useState([true])
    const [self_enter_jp, setSelfEnterJP] = useState([true])
    const [synonyms, setSynonyms] = useState([{ synonym: '' }]);
    const [examples, setExamples] = useState([{ example: '' }]);
    const [pronunciation, setPronunciation] = useState('');
    const [yourAudio, setYourAudio] = useState('');
    const [exampleAudio, setExampleAudio] = useState('');

    const [hasWord, setHasWord] = useState(false);

    const MAX_AUTO_COMPLETION = 5;
    const [isAutoCompError, setIsAutoCompError] = useState(false);
    const [isBeatLoading, setIsBeatLoading] = useState(false);
    const [isSpinnerLoading, setIsSpinnerLoading] = useState(false);
    const { getFullDefinitionWord, getWordPronunciation } = FlashCardFeatures();
    const { assoArrToArrayVal } = ArrayHelpers();

    useEffect(() => {
        word == '' ? setHasWord(false) : setHasWord(true);
    }, [word]);

    const registerFlashCard = async () => {
        setIsSpinnerLoading(true);

        if (exampleAudio == '' && pronunciation == '') {
            getWordPronunciation(word)
            .then(
                result => {
                    console.log(result);
                    let pronunciationKey = null;
                    let audioURL = null;
                    if (result.Pronunciation.All != null) {
                        setPronunciation(result.Pronunciation.All);
                        pronunciationKey = result.Pronunciation.All;
                    }
                    if (result.Pronunciation.AudioURL != null) {
                        setExampleAudio(result.Pronunciation.AudioURL);
                        audioURL = result.Pronunciation.AudioURL;
                    }
                    
                    const newFlashCard = setFlashCard(pronunciationKey, audioURL);
                    console.log(newFlashCard);
    
                    if (!isSignedUp) {
                        addSampleFlashCard(newFlashCard)
                    }

                    toast.success('Flash card added successfully');
                },
                error => {
                    console.log(error);
                    toast.error('Flash card registeration faild');
                }
            )
            .catch((error) => {
                console.log(error);
                toast.error('Flash card registeration faild');
            })
            .finally(() => {
                resetInputs();
                setWord('');
                setIsSpinnerLoading(false);
                return;
            });
        } else {
            const newFlashCard = setFlashCard();
            console.log(newFlashCard);
    
            if (!isSignedUp) {
                addSampleFlashCard(newFlashCard)
    
                resetInputs();
                setWord('');
                setIsSpinnerLoading(false);
                toast.success('Flash card added successfully');
                return;
            }
    
            resetInputs();
            setWord('');
            setIsSpinnerLoading(false);
            toast.success('Flash card added successfully');
        }
    }

    const setFlashCard = (pronunciationKey = null, audioURL = null) => {
        return {
            word: word,
            type: type,
            definition_en: self_enter_en ? definition_en : definition_en_select[definition_en],
            definition_jp: self_enter_jp ? definition_jp : definition_jp_select[definition_jp],
            synonyms: assoArrToArrayVal(synonyms),
            examples: assoArrToArrayVal(examples),
            exampleAudio: audioURL,
            pronunciation: {
                all: pronunciationKey
            },
            yourAudio: yourAudio
        }
    }

    const resetInputs = () => {
        setType('');
        setTypeList(Object.keys(wordTypes))
        setEnDefinition('');
        setEnSelectDefinition([]);
        setJPDefinition('');
        setJPSelectDefinition([]);
        setSynonyms([{ synonym: '' }]);
        setExamples([{ example: '' }]);
        setSelfEnterEn(true);
        setSelfEnterJP(true);
        setExampleAudio('');
        setPronunciation('')
        setYourAudio('')
    }

    const backToEnInput = () => {
        setEnDefinition('');
        setEnSelectDefinition([])
        setSelfEnterEn(true)
    }

    const backToJPInput = () => {
        setJPDefinition('');
        setJPSelectDefinition([])
        setSelfEnterJP(true)
    }

    const autoWordCompletion = async () => {
        if(!hasWord) return;

        setIsBeatLoading(true);
        setIsAutoCompError(false);
        
        const result = await getFullDefinitionWord(word);
        if(!result) {
            setIsAutoCompError(true);
            setIsBeatLoading(false);
            return;
        }
        resetInputs();
        setInputCompletion(result);
        setIsBeatLoading(false);
    }

    const setInputCompletion = async (result) => {
        if (result.Pronunciation.AudioURL) {
            setExampleAudio(result.Pronunciation.AudioURL);
        }

        if (result.Pronunciation.All) {
            setPronunciation(result.Pronunciation.All);
        }

        const types = [];
        for(let i = 0; i < MAX_AUTO_COMPLETION; i++) {
            if(result.Results[i] && result.Results[i].PartOfSpeech) {
                if(types.includes(result.Results[i].PartOfSpeech)) {
                    continue;
                } 
                types.push(result.Results[i].PartOfSpeech);
            }
        }
        setTypeList(types);
        
        const definitions_en = [];
        for(let i = 0; i < MAX_AUTO_COMPLETION; i++) {
            if(result.Results[i] && result.Results[i].Definition) {
                definitions_en.push(result.Results[i].Definition)
            }
        }
        setSelfEnterEn(false)
        setEnSelectDefinition(definitions_en)
        
        const definitions_jp = [];
        for(let i = 0; i < MAX_AUTO_COMPLETION; i++) {
            if(result.DefinitionsJp && result.DefinitionsJp[i]) {
                definitions_jp.push(result.DefinitionsJp[i]);
            }
        }
        setSelfEnterJP(false)
        setJPSelectDefinition(definitions_jp)
        
        for(let i = 0; i < MAX_AUTO_COMPLETION; i++) {
            if(result.Results[i] && result.Results[i].Synonyms) {
                setValueToMultiInputHelper('synonyms', result.Results[i].Synonyms[0], i);
            }
        }
        
        let indexEg = 0;
        for(let i = 0; i < MAX_AUTO_COMPLETION; i++) {
            if(result.Results[i] && result.Results[i].Examples) {
                if(result.Results[i].Examples == '') {
                    continue;
                }
                setValueToMultiInputHelper('examples', result.Results[i].Examples[0], indexEg);
                indexEg++;
            }
        }
    }

    const setValueToMultiInputHelper = (inputType, value, index) => {
        switch(inputType) {
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
                <form onSubmit={ handleSubmit(registerFlashCard) } >
                    <h2 className="text-2xl text-center font-bold mb-8">
                        Add Flash Card
                    </h2>

                    <div className='flex justify-between mb-6'>
                        {
                            isSpinnerLoading ?
                            <Spinner /> :
                            <>
                            <section className='w-full mx-4'>
                                <div className="mb-4">
                                    <div className="flex mb-2">
                                        <label htmlFor="word" className='block text-gray-700 font-bold mr-2'>Word</label>
                                        <span className='bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-1 rounded-full dark:bg-red-900 dark:text-white'>必須</span>
                                    </div>
                                    <input 
                                        type="text" 
                                        id='word' 
                                        name='word' 
                                        className='border border-gray-300 rounded w-full py-2 px-3' 
                                        placeholder='eg. promising'
                                        value={ word }
                                        {...register("word", { 
                                            required: 'Word is required', 
                                            maxLength: { value: 100, message: 'Input within 100 letters' }
                                        })}
                                        onChange={(e) => setWord(e.target.value)}
                                    />
                                    <p className='text-red-500 text-sm mt-1'>{errors.word?.message}</p>
                                </div>
                                { hasWord ? 
                                    <div className="flex">
                                        <button type='button' className="flex hover:bg-gray-300 rounded p-1 mr-2" disabled={ isBeatLoading }>
                                            <MdAutorenew />
                                            <span className='text-bold text-sm text-black' onClick={ autoWordCompletion }>自動入力</span>
                                        </button>

                                        { isBeatLoading 
                                            ?
                                            <BeatLoader loading={ isBeatLoading } />
                                            :
                                            <></>
                                        }
                                    </div>
                                    :
                                    <></>
                                }
                                {
                                    isAutoCompError ?
                                        <p className="text-red-600 text-xs mb-2">
                                            この単語の自動入力はできません
                                        </p>
                                    :
                                    <></>
                                }

                                <div className="mb-4">
                                    <div className="flex mb-2">
                                        <label htmlFor="type" className='block text-gray-700 font-bold mr-2'>Word Type</label>
                                        <span className='bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-1 rounded-full dark:bg-red-900 dark:text-white'>必須</span>
                                    </div>
                                    <select 
                                        name="type" 
                                        id="type" 
                                        className='border border-gray-300 rounded w-full py-2 px-3 mb-2 hover:cursor-pointer' 
                                        {...register("type", { 
                                            required: 'Word type is required', 
                                        })}
                                        onChange={(e) => setType(e.target.value)}
                                        value={ type }
                                    >
                                        <option value="">選択してください。</option>
                                        {
                                            typeList.map((type, index) => (
                                                <option key={ index } value={ type }>
                                                    { wordTypes[type] }
                                                </option>
                                            ))
                                        }
                                    </select>
                                    <p className='text-red-500 text-sm mt-1'>{errors.type?.message}</p>
                                </div>

                                <div className="mb-4">
                                    <div className="flex mb-2">
                                        <label className='block text-gray-700 font-bold mr-2'>
                                            英語での意味
                                        </label>
                                        <span className='bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-1 rounded-full dark:bg-red-900 dark:text-white'>必須</span>
                                    </div>
                                    {
                                        !self_enter_en ?
                                            <select 
                                                name="definition_en" 
                                                id="definition_en" 
                                                className='border border-gray-300 rounded w-full py-2 px-3 mb-2 hover:cursor-pointer' 
                                                {...register("definition_en", { 
                                                    required: 'English definition is required', 
                                                })}
                                                value={ definition_en }
                                                onChange={(e) => setEnDefinition(e.target.value)
                                                }
                                            >
                                                <option value="">選択してください。</option>
                                                {
                                                    definition_en_select.map((definition, index) => (
                                                        <option key={ index } value={ index }>
                                                            { definition }
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        :
                                            <input 
                                            type="text" 
                                            id='definition_en' 
                                            name='definition_en' 
                                            className='border border-gray-300 rounded w-full py-2 px-3' 
                                            placeholder='eg. bright'
                                            {...register("definition_en", { 
                                                required: 'English definition is required', 
                                            })}
                                            value={ definition_en }
                                            onChange={(e) => setEnDefinition(e.target.value)}
                                            />
                                    }
                                    <p className='text-red-500 text-sm mt-1'>{errors.definition_en?.message}</p>
                                    {
                                        !self_enter_en ?
                                            <button className="flex text-sm py-1 px-3 rounded bg-gray-200" onClick={ backToEnInput }>
                                                <span className='mr-1'>
                                                    入力に戻す
                                                </span>
                                                <RiArrowGoBackLine className='mt-0.5'/>
                                            </button>
                                        :
                                            <></>
                                    }
                                </div>

                                <div className="mb-4">
                                    <div className="flex mb-2">
                                        <label className='block text-gray-700 font-bold mr-2'>日本語での意味</label>
                                        <span className='bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-1 rounded-full dark:bg-red-900 dark:text-white'>必須</span>
                                    </div>
                                    {
                                        !self_enter_jp ?
                                            <select 
                                                name="definition_jp" 
                                                id="definition_jp" 
                                                className='border border-gray-300 rounded w-full py-2 px-3 mb-2 hover:cursor-pointer' 
                                                {...register("definition_jp", { 
                                                    required: 'English definition is required', 
                                                })}
                                                value={ definition_jp }
                                                onChange={ (e) => setEnDefinition(e.target.value) }
                                            >
                                                <option value="">選択してください。</option>
                                                {
                                                    definition_jp_select.map((jp_definition, index) => (
                                                        <option key={ index } value={ index }>
                                                            { jp_definition }
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        :
                                            <input 
                                                type="text" 
                                                id='definition_jp' 
                                                name='definition_jp' 
                                                className='border border-gray-300 rounded w-full py-2 px-3' 
                                                placeholder='eg. 将来有望な'
                                                {...register("definition_jp", { 
                                                    required: 'Japanese definition is required', 
                                                })}
                                                value={ definition_jp }
                                                onChange={(e) => setJPDefinition(e.target.value)}
                                            />
                                    }
                                    <p className='text-red-500 text-sm mt-1'>{errors.definition_jp?.message}</p>
                                    {
                                        !self_enter_jp ?
                                            <button className="flex text-sm py-1 px-3 rounded bg-gray-200" onClick={ backToJPInput }>
                                                <span className='mr-1'>
                                                    入力に戻す
                                                </span>
                                                <RiArrowGoBackLine className='mt-0.5'/>
                                            </button>
                                        :
                                            <></>
                                    }
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
                            </>
                        }
                    </div>

                    <div className='text-center'>
                        <button className="bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-400 inline-flex mr-4" type='submit'>
                            <span className='mr-2'>
                                Add Flash Card
                            </span>
                            <LuBookUp className='text-2lg mt-0.5' />
                        </button>
                        <button className="text-black bg-gray-300 py-2 px-4 rounded hover:bg-gray-200 " onClick={ resetInputs }>
                            Clear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default AddFlashCard