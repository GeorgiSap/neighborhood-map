import React, { Component } from 'react';
import './App.css';
import ListView from './ListView.js';
import MainView from './MainView.js';
import * as locationsData from './data/locations.json';

class App extends Component {

  state = {
    isListViewAlongside : false,
    isListViewOpened : false,
    isMainDarkened : false,
    locations : locationsData.locations,
    selectedLocation : false
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

  openInfoWindow = (location) => {
    if (!this.state.isListViewAlongside) {
      if (this.state.isListViewOpened) {
        this.setState({
          isListViewOpened: false,
          isMainDarkened: false
        })
      }
    }

    this.setState({selectedLocation: location})
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
          isListViewOpened={this.state.isListViewOpened}
          openInfoWindow={this.openInfoWindow} />
     
        <MainView
          locations={this.state.locations}
          isListViewAlongside={this.state.isListViewAlongside}
          isListViewOpened={this.state.isListViewOpened} 
          isMainDarkened={this.state.isMainDarkened} 
          onHamburgerClick={this.onHamburgerClick}
          openInfoWindow={this.openInfoWindow} 
          onMainClick={this.onMainClick}
          selectedLocation={this.state.selectedLocation} />

      </div>
    );
  }
}

export default App;
