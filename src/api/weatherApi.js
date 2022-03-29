import axios from 'axios';
import key from './weatherApiKey'
var url = 'https://api.openweathermap.org/data/2.5/weather'
var iconUrl = 'http://openweathermap.org/img/wn/'
var lat = '51.1661'
var lon = '4.9919';
var units = 'metric';

class WeatherApi {
    getWeather() {
        return axios.get(url + "?lat=" + lat + "&lon=" + lon + "&appid=" + key + "&units=" + units)
    }
    getWeatherIcon(iconCode) {
        return <img src={iconUrl + iconCode + '@2x.png'} alt=""></img>
    }
}

export default WeatherApi;