import React, { Component } from 'react';
import './App.css';
import ListView from './ListView.js';
import MainView from './MainView.js';

class App extends Component {

  state = {
    isListViewAlongside : false,
    isListViewOpened : false,
    isMainDarkened : false,
    locations : [
      {title: 'Musala Peak', position : {lat : 42.179243, lng : 23.5852432}},
      {title: 'Rila Monastery', position : {lat : 42.1333838, lng : 23.3401215}},
      {title: 'Malyovitsa Peak', position : {lat : 42.1666667, lng : 23.3666667}},
      {title: 'Seven Rila Lakes', position : {lat : 42.202778, lng : 23.32}},
      {title: 'Yazovir Belmeken', position : {lat : 42.1666667, lng : 23.8}},
      {title: 'Skakavitsa Waterfall', position : {lat : 42.2213501, lng : 23.3059478}}, 
      {title: 'Parangalitsa', position : {lat : 42.0057878, lng : 23.3622739}},
      {title: 'Waterfall Kostenets', position : {lat : 42.2485196, lng : 23.8048843}},
      {title: 'Markudjik Ski Center', position : {lat : 42.2157817, lng : 23.5756325}},
      {title: 'Carska Bistrica Residence', position : {lat : 42.2584737, lng : 23.5953557}}
    ]
  }

  onHamburgerClick = () => {
    if (this.state.isListViewAlongside) {
        this.setState({
          isListViewAlongside: false,
          isListViewOpened: false
        })
    } else {
      if (window.innerWidth >= 600) {
        this.setState({
          isListViewAlongside: true,
          isListViewOpened: true
        }) 
      } else {
        this.setState({
          isListViewOpened: true,
          isMainDarkened: true
        })  
      }
    }
  }

  onMainClick = (event) => {
    if (!this.state.isListViewAlongside) {
      if (this.state.isListViewOpened) {
        event.stopPropagation();
        this.setState({
          isListViewOpened: false,
          isMainDarkened: false
        });
      }
    }
  }

  setViewStateOnMount = () => {
    let isListViewAlongside = window.innerWidth >= 600
      this.setState({
        isListViewAlongside: isListViewAlongside,
        isListViewOpened: isListViewAlongside
    })
  }

  setViewStateOnResize = () => {
    window.addEventListener('resize', () => {
      let isListViewAlongside = window.innerWidth >= 600
      this.setState({
        isListViewAlongside: isListViewAlongside,
        isListViewOpened: isListViewAlongside,
        isMainDarkened: false
      })
    })
  }

  buildLocationsParam = () => {
    let param = '';
    this.state.locations.forEach((location, index) => {
      param += location.position.lat + ',' + location.position.lng
      if (index < this.state.locations.length - 1) {
        param += '|';
      }
    })
    return param;
  }

  buildRequestURL = () => {
    let url = new URL("https://maps.googleapis.com/maps/api/elevation/json"),
    params = {
      locations: this.buildLocationsParam(), 
      key: 'AIzaSyCOIb8tce725I3evjOt185ooz0A4UgsK1s'
    }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return url;
  }

  fetchElevationData = () => {
    fetch(this.buildRequestURL())
      .then(response => response.json())
      .then(data => {
        if (data.results) {
          this.setState(prevState => ({
            locations : prevState.locations.map((location, index) => {
              if (data.results[index] && data.results[index].elevation)
                location.elevation = Math.round(data.results[index].elevation)
              return location;
            })
          }))
        }
      })
      .catch(error => console.log('Unable to fetch elevation data'))
  }

  componentDidMount() {
    this.setViewStateOnMount()
    this.setViewStateOnResize()
    this.fetchElevationData()
  }

  render() {
    let className = "App"
    if (this.state.isListViewAlongside) {
      className += ' alongside'
    }

    return (
      <div className={className} >
       
        <ListView 
          locations={this.state.locations}
          isListViewAlongside={this.state.isListViewAlongside}
          isListViewOpened={this.state.isListViewOpened} />
     
        <MainView
          locations={this.state.locations}
          isListViewAlongside={this.state.isListViewAlongside}
          isListViewOpened={this.state.isListViewOpened} 
          isMainDarkened={this.state.isMainDarkened} 
          onHamburgerClick={this.onHamburgerClick}
          onMainClick={this.onMainClick} />

      </div>
    );
  }
}

export default App;
