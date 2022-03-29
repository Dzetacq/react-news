import axios from 'axios';
import {newscatcherKey} from './apiKeys'
var url = "https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=business&page_size=30"

class NewsApi {
    getNews() {
        return axios.get(url, {headers: {'x-api-key' : newscatcherKey}});
    }
}

export default NewsApi;