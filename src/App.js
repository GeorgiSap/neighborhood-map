import React, { Component } from 'react'
import './App.css'
import ListView from './ListView.js'
import MainView from './MainView.js'
import * as locationsData from './data/locations.json'
import * as ElevationAPI from './util/ElevationAPI.js'
import * as ResponsiveUtil from './util/ResponsiveUtil.js'

class App extends Component {

  state = {
    isListViewAlongside : false,
    isListViewOpened : false,
    isMainDarkened : false,
    locations : locationsData.locations,
    selectedLocation : false
  }

  onHamburgerClick = () => {
    ResponsiveUtil.onHamburgerClick(this)
  }

  onMainClick = (event) => {
    ResponsiveUtil.onMainClick(event, this)
  }

  onInfoWindowOpen = (location) => {
    ResponsiveUtil.onInfoWindowOpen(location, this)
  }

  componentDidMount() {
   ResponsiveUtil.setViewStateOnMount(this)
   ResponsiveUtil.setViewStateOnResize(this)
   ElevationAPI.fetchElevationData(this)
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
          onInfoWindowOpen={this.onInfoWindowOpen} />
     
        <MainView
          locations={this.state.locations}
          isListViewAlongside={this.state.isListViewAlongside}
          isListViewOpened={this.state.isListViewOpened} 
          isMainDarkened={this.state.isMainDarkened} 
          onHamburgerClick={this.onHamburgerClick}
          onInfoWindowOpen={this.onInfoWindowOpen} 
          onMainClick={this.onMainClick}
          selectedLocation={this.state.selectedLocation} />

      </div>
    )
  }
}

export default App
