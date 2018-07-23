import React, { Component } from 'react';
import './MainView.css';
import Map from './Map.js';

class MainView extends Component {

	onCloseLinkKeyPress = (event) => {
		if (event.key === 'Enter') {
			this.props.onMainClick(event);
		}
	}

	componentDidUpdate() {
		if (!this.props.isListViewOpened) {
			this.refs.main.focus()
		}
	}

	render() {
		let mainClassName;
		let hamburgerClassList="hamburger"
		if (this.props.isListViewAlongside) 
			mainClassName = 'alongside'
		if (this.props.isMainDarkened) {
			mainClassName = 'darken'
			hamburgerClassList += ' hidden'
		}

		return (
			<main tabIndex="-1" ref="main" className={mainClassName} onClickCapture={this.props.onMainClick} >
				<header>
					<button 
							className={hamburgerClassList}
							aria-label="menu" 
							onClickCapture={this.props.onHamburgerClick}>☰
					</button>
					<h1 className="header-heading">
						<span className="header-icon">⛰</span> Rila Mountain Sites
					</h1>
				</header>
			    <Map
			    	locations={this.props.locations}
			    	openInfoWindow={this.props.openInfoWindow}
			    	selectedLocation={this.props.selectedLocation}
				    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
			      	containerElement={<div aria-label="location" role="application" style={{height: `calc(100% - 3em)`, width: `100%`, position: `relative`, textAlign: `center` }} />}
  					mapElement={<div style={{ position: `absolute`, height: `100%`, width: `100%`}} />}
			      	loadingElement={<div style={{ height: `100%` }}/>}
				/>
				{this.props.isMainDarkened &&
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

export default MainView;