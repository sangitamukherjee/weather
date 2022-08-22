import React from 'react';
import './App.css';


class Post extends React.Component {
  state = {
    currentState: 'begin',
    low: 0,
    high: 0,
    current: 0,
    imageUrl: '',
    weatherState: '',
    currentState1: 'begin',
    low1: 0,
    high1: 0,
    current1: 0,
    imageUrl1: '',
    weatherState1: ''
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    this.setState({ currentState: 'loading'});

    const url = `https://api.openweathermap.org/data/2.5/weather?zip=3000,au&units=metric&appid=052f26926ae9784c2d677ca7bc5dec98`;
    const url1 = `https://api.openweathermap.org/data/2.5/weather?zip=2000,au&units=metric&appid=052f26926ae9784c2d677ca7bc5dec98`;

    try {
      const response = await fetch(url);
      const response1 = await fetch(url1);
      const json = await response.json();
      const json1 = await response1.json();

      // Get the icon
      let iconCode;
      let iconCode1;

      let weather = json.weather[0];
      let weather1 = json1.weather[0];

      // There's a lot more variations based on time of day/severity, but I haven't had enough coffee to deal with that.
      if (typeof weather === 'undefined') {
        weather = null;
      } else {
        if (weather.id <= 232) {
          iconCode = "11d";
        }
        else if (weather.id <= 321 && weather.id > 232) {
          iconCode = '09d';
        } else if (weather.id <= 531 && weather.id > 321) {
          iconCode = '10d';
        } else if (weather.id <= 622 && weather.id > 531) {
          iconCode = '13d';
        } else if (weather.id <= 781 && weather.id > 622) {
          iconCode = '50d';
        } else if (weather.id === 800) {
          iconCode = '01d';
        } else if (weather.id > 800) {
          iconCode = '02d';
        }
      }
      if (typeof weather1 === 'undefined') {
        weather1 = null;
      } else {
        if (weather1.id <= 232) {
          iconCode1 = "11d";
        }
        else if (weather1.id <= 321 && weather1.id > 232) {
          iconCode1 = '09d';
        } else if (weather1.id <= 531 && weather1.id > 321) {
          iconCode1 = '10d';
        } else if (weather1.id <= 622 && weather1.id > 531) {
          iconCode1 = '13d';
        } else if (weather1.id <= 781 && weather1.id > 622) {
          iconCode1 = '50d';
        } else if (weather1.id === 800) {
          iconCode1 = '01d';
        } else if (weather1.id > 800) {
          iconCode1 = '02d';
        }
      }

      this.setState({
        currentState: 'results',
        low: json.main.temp_min,
        high: json.main.temp_max,
        current: json.main.temp,
        imageUrl: (iconCode) ? `http://openweathermap.org/img/wn/${iconCode}@2x.png` : "",
        weatherState: weather?.description,
        low1: json1.main.temp_min,
        high1: json1.main.temp_max,
        current1: json1.main.temp,
        imageUrl1: (iconCode1) ? `http://openweathermap.org/img/wn/${iconCode1}@2x.png` : "",
        weatherState1: weather1?.description
      });
    }
    catch (ex) {
      this.setState({ currentState: 'error'});
    }
  }

  render() {
    return (
      <div className="App">
      <h2>Weather of Australia's Major Cities</h2>
          <form className="postcode-input" onSubmit={this.handleSubmit}>
            <div>
              <input type="submit" value="Get Weather Condition!" />
            </div>
          </form>
          <hr/>

        {
          (this.state.currentState === 'loading') &&
          (
            <p>Fetching data...</p>
          )
        }

        {
          (this.state.currentState === 'results') &&
          (
            <>
            <h3>Melbourne</h3>
              {(this.state.imageUrl !== '') &&
                (
                  <div className="image-container">
                    <img width={70} height={70} src={this.state.imageUrl} alt={this.state.weatherState} />
                    <h4 className="weather-state">{this.state.weatherState}</h4>
                    <hr/>
                    <h4>{this.state.current}&#176;C</h4>
                    <hr/>
                    <h4>Min: {this.state.low}&#176;C | Max: {this.state.high}&#176;C</h4>
                  </div>
                )
              }
            <hr/>
            <h3>Sydney</h3>
              {(this.state.imageUrl1 !== '') &&
                (
                  <div className="image-container1">
                    <img width={70} height={70} src={this.state.imageUrl1} alt={this.state.weatherState1} />
                    <h4 className="weather-state1">{this.state.weatherState1}</h4>
                    <hr/>
                    <h4>{this.state.current1}&#176;C</h4>
                    <hr/>
                    <h4>Min: {this.state.low1}&#176;C | Max: {this.state.high1}&#176;C</h4>
                  </div>
                )}
            </>
          )
        }
      </div>
    )
  }
}

export default Post;
