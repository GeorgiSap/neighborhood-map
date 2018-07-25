import React, { Component } from 'react'
import './App.css'
import ListView from './ListView.js'
import MainView from './MainView.js'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as locationsData from './data/locations.json'
import * as ElevationAPI from './util/ElevationAPI.js'
import * as ResponsiveUtil from './util/ResponsiveUtil.js'

class App extends Component {

  state = {
    isListViewAlongside : false,
    isListViewOpened : false,
    isMainDarkened : false,
    locations : locationsData.locations,
    selectedLocation : null,
    query : '',
    hasError: false,
    showModal: false
  }

/**
  * @description Updates state of search query
  * @param {string} query
  */
  updateQuery = query => {
    this.setState({query})
  }

  onError = (error, info) => {
    this.setState({hasError: true})
  }
  
  closeModal = () => {
    this.setState({showModal: false});
  }

  unselectLocation = ()=> {
    this.setState({selectedLocation: null})
  }

  onHamburgerClick = () => {
    ResponsiveUtil.onHamburgerClick(this)
  }

  onMainClick = event => {
    ResponsiveUtil.onMainClick(event, this)
  }

  onInfoWindowOpen = location => {
    ResponsiveUtil.onInfoWindowOpen(location, this)
  }

  componentDidMount() {
    ResponsiveUtil.setViewStateOnMount(this)
    ResponsiveUtil.setViewStateOnResize(this)
    ElevationAPI.fetchElevationData(this)
  }

  componentDidCatch(error, info) {
    this.setState({hasError: true}) 
  }

  render() {
    const {locations, query, isListViewAlongside, isListViewOpened, 
      isMainDarkened, selectedLocation, hasError, showModal} = this.state

    /* Filters showing locations based on search query */
    let filteredLocations
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      filteredLocations = locations.filter(location => 
        match.test(location.title))
    } else {
      filteredLocations = locations
    }

    /* Sorts showing locations by title */
    filteredLocations.sort(sortBy('title'))

    /* Generates classList of wrapper div dynamically based on view */
    let wrapperClassList = 'App'
    if (this.state.isListViewAlongside) {
      wrapperClassList += ' alongside'
    }

    return (
      <div className={wrapperClassList} >
       
        <ListView 
          locations={filteredLocations}
          isListViewAlongside={isListViewAlongside}
          onInfoWindowOpen={this.onInfoWindowOpen}
          isListViewOpened={isListViewOpened}
          selectedLocation={selectedLocation}
          updateQuery={this.updateQuery}
          query={query} />
     
        <MainView
          locations={filteredLocations}
          isListViewAlongside={isListViewAlongside}
          isListViewOpened={isListViewOpened} 
          isMainDarkened={isMainDarkened} 
          onHamburgerClick={this.onHamburgerClick}
          onInfoWindowOpen={this.onInfoWindowOpen} 
          onMainClick={this.onMainClick}
          selectedLocation={this.state.selectedLocation}
          unselectLocation={this.unselectLocation}
          closeModal={this.closeModal} 
          showModal={showModal}
          onError={this.onError}
          hasError={hasError} />

      </div>
    )
  }
}

export default App
