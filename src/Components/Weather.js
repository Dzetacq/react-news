import React, {Component} from 'react'
import WeatherApi from '../api/weatherApi';

class Weather extends Component {
    constructor() {
        super();
        this.state = {
            weather: {}
        }
    }

    componentDidMount() {
        let api = new WeatherApi();
        var promise = api.getWeather();
        promise.then(function(r) {
                this.setState({weather: r.data})
            }.bind(this), function() {console.log('api error')}
        );
    }

    render() {
        return (
             <div><WeatherItem city="Geel" weather={this.state.weather} /></div>
        );
    }
}

const WeatherItem = (props) => {
    let api = new WeatherApi();
    var date = new Date()
    if (!props.weather.main) {return (<div>Loading</div>)}
    return (
        <div className="card">
            <div>
                {props.weather.main.temp} °C - {api.getWeatherIcon(props.weather.weather[0].icon)} {props.weather.weather[0].description}
            </div>
            <div className="card-section">
                <p>{props.city} - {date.toLocaleDateString()}</p>
            </div>
        </div>
    );

};

export default Weather;