import HttpFeature from './HttpFeature';
import { GetApiUrl, GetWordsApiUrl } from '../config/AppConfig';

const FlashCardFeatures = () => {
    const { makeRequest } = HttpFeature();
    
    const getDefinitionWord = async (word) => {
        const url = GetApiUrl() + GetWordsApiUrl();
        const encodedWord = encodeURIComponent(word);

        const result = await makeRequest(url, 'GET', encodedWord);
        console.log(result);
        if(result == '') {
            return false;
        }
        
        return result;
    };

    return { getDefinitionWord };
}

export default FlashCardFeatures