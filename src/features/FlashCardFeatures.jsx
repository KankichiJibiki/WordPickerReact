import HttpFeature from './HttpFeature';
import { GetApiUrl, GetWordsFullInfoApiUrl, GetWordsPronunciationApiUrl } from '../config/AppConfig';

const FlashCardFeatures = () => {
    const { makeRequest } = HttpFeature();
    
    const getFullDefinitionWord = async (word) => {
        const url = GetApiUrl() + GetWordsFullInfoApiUrl();
        const encodedWord = encodeURIComponent(word);

        try {
            const result = await makeRequest(url, 'GET', encodedWord);
            console.log(result);
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const getWordPronunciation = (word) => new Promise(async resolve => {
        const url = GetApiUrl() + GetWordsPronunciationApiUrl();
        const encodedWord = encodeURIComponent(word);

        try {
            const result = await makeRequest(url, 'GET', encodedWord);
            console.log(result);
            resolve(result);
        } catch (error) {
            console.log(error);
            resolve(error);
        }
    });

    return { 
        getFullDefinitionWord, 
        getWordPronunciation 
    };
}

export default FlashCardFeatures