import axios from 'axios';
import {newscatcherKey} from './apiKeys'
var url = "https://api.newscatcherapi.com/v2/latest_headlines?"

class NewsApi {
    getNews() {
        let amount = 50
        let countries = "BE,NL,UK" //comma separated
        let topic = "news" //only 1
        let fullUrl = url + (countries? "countries=" + countries + "&" : "") + (topic ? "topic=" + topic + "&" : "") + "page_size=" + amount;
        let promise = axios.get(fullUrl, {headers: {'x-api-key' : newscatcherKey}})
        return promise;
    }
}

export default NewsApi;