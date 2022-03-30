import React, {Component} from 'react'
import { Card } from 'react-bootstrap';
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
        <article className="Weather-card"  >
            <div className='shadow'>
                <Card bg="light" >
                    <Card.Img src={api.getWeatherIcon(props.weather.weather[0].icon)} />
                    <Card.Body>
                        <Card.Title>{Math.round(props.weather.main.temp)} °C - {props.weather.weather[0].description}</Card.Title>
                        <Card.Text>Humidity: {props.weather.main.humidity}%</Card.Text>
                        <Card.Text>Visibility: {props.weather.visibility > 1000 ? "great" : props.weather.visibility + "m"}</Card.Text>
                        <Card.Text>Wind: {Math.round(props.weather.wind.speed * 3.6)} km/h</Card.Text>
                        <Card.Text>Cloudiness: {props.weather.clouds.all}%</Card.Text>
                        <Card.Subtitle className='text-muted mt-2'>{props.city} - {date.toLocaleDateString()}</Card.Subtitle>
                    </Card.Body>
                </Card>
            </div>
        </article>
        
    );

};

export default Weather;