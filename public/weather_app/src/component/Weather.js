import './Weather.css'
import React, { Component } from 'react';

class Weather extends Component {
    constructor (props) {
        super(props);
        const app_url = 'http://3.15.234.136';
        this.state = { name: "", temp: 0, pressure: 0, humidity: 0, visibility: 0, lat: 0, lon:0};        
        
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });
        
        fetch(`${app_url}/weather?city=${params.city}`)
        .then(response=>response.json())
        .then(data=>{ 
            let coord = data.coord;
            this.setState({ ...this.state, 
                name: data.name,
                temp: data.main.temp, 
                pressure: data.main.pressure, 
                humidity: data.main.humidity, 
                visibility: data.visibility,
                lat: coord["lat"], 
                lon: coord["lon"]
            })
        })
    }



    render () {
        
        return (        
            <div className="Weather">
                <div>
                    <h1>Location: {this.state.name}</h1>
                    <h1>Temperature: {parseInt(this.state.temp - 273.15)}°C</h1>
                    <h1>Pressure: {this.state.pressure}</h1>
                    <h1>Humidity: {this.state.humidity}%</h1>
                    <h1>Visibility: {parseInt(this.state.visibility/1000)} Km</h1>
                </div>  
            </div>
        );
    }
}


export default Weather;