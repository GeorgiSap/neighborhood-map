import React, { Component } from 'react'
import './MainView.css'
import Map from './Map.js'
import PropTypes from 'prop-types'

class MainView extends Component {

   /**
  	* @description Calls onInfoWindowOpen if pressed key is 'Enter'
  	* @param {object} event
  	*/
	onCloseLinkKeyPress = (event) => {
		if (event.key === 'Enter') {
			this.props.onMainClick(event)
		}
	}

   /**
  	* @description Sets focus to main if list view is not opened
  	*/
	componentDidUpdate() {
		if (!this.props.isListViewOpened) {
			this.refs.main.focus()
		}
	}

	render() {
		const {locations, isListViewAlongside, isMainDarkened, onHamburgerClick, 
			onInfoWindowOpen, onMainClick, selectedLocation} = this.props

		/* Generates classList of main and hamburger dynamically based on view */
		let mainClassName
		let hamburgerClassList="hamburger"
		if (isListViewAlongside) 
			mainClassName = 'alongside'
		if (isMainDarkened) {
			mainClassName = 'darken'
			hamburgerClassList += ' hidden'
		}

		return (
			<main tabIndex="-1" ref="main" className={mainClassName} onClickCapture={onMainClick} >
				<header>
					<button 
							className={hamburgerClassList}
							aria-label="menu" 
							onClickCapture={onHamburgerClick}>☰
					</button>
					<h1 className="header-heading">
						<span className="header-icon">⛰</span> Rila Mountain Sites
					</h1>
				</header>
			    <Map
			    	locations={locations}
			    	onInfoWindowOpen={onInfoWindowOpen}
			    	selectedLocation={selectedLocation}
			    	unselectLocation={this.props.unselectLocation}
				    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
			      	containerElement={<div aria-label="location" role="application" style={{height: `calc(100% - 3em)`, width: `100%`, position: `relative`, textAlign: `center` }} />}
  					mapElement={<div style={{ position: `absolute`, height: `100%`, width: `100%`}} />}
			      	loadingElement={<div style={{ height: `100%` }}/>}
				/>
				{isMainDarkened &&
				<a className="close-menu"
				   aria-label="close" 
				   tabIndex="0"
				   onKeyPress={this.onCloseLinkKeyPress} >
					×
				</a>}
			</main>
		)
	}
}

MainView.propTypes = {
	locations: PropTypes.array.isRequired,
    isListViewAlongside: PropTypes.bool.isRequired,
    isListViewOpened: PropTypes.bool.isRequired,
    isMainDarkened: PropTypes.bool.isRequired,
    onHamburgerClick: PropTypes.func.isRequired,
    onInfoWindowOpen: PropTypes.func.isRequired,
    onMainClick: PropTypes.func.isRequired,
    selectedLocation: PropTypes.object
}

export default MainView