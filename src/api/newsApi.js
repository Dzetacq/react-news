import axios from 'axios';
import {newsKey} from './apiKeys'
var url = 'https://newsapi.org/v2/top-headlines?country=be&apiKey=' + newsKey;

class NewsApi {
    getNews() {
        return axios.get(url);
    }
}

export default NewsApi;