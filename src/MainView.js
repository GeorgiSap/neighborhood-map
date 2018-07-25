import React, { Component } from 'react'
import './MainView.css'
import MapContainer from './MapContainer.js'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import mountainClimbing from './img/mountain-climbing.JPG'

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
			onInfoWindowOpen, onMainClick, selectedLocation, unselectLocation,
			showModal, closeModal, hasError, onError} = this.props

	    const modalStyles = {
	      content : {
	        top: `50%`,
	        left: `50%`,
	        right: `auto`,
	        bottom: `auto`,
	        marginRight: `-50%`,
	        transform: `translate(-50%, -50%)`,
	        opacity: 1,
	        zIndex: 10,
	        padding: `10px`
	      },
	      overlay: {zIndex: 5, background: `rgba(54, 54, 54, 0.3)`}
	    }

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
				<MapContainer 
			    	locations={locations}
			    	onInfoWindowOpen={onInfoWindowOpen}
			    	selectedLocation={selectedLocation}
			    	unselectLocation={unselectLocation}
			    	onError={onError}
			    	hasError={hasError}
				/>
				{isMainDarkened &&
				<a className="close-menu"
				   aria-label="close" 
				   tabIndex="0"
				   onKeyPress={this.onCloseLinkKeyPress} >
					×
				</a>}

				{showModal && !hasError && (
					<ReactModal appElement={document.getElementById('root')}
								isOpen={showModal}	
								style={modalStyles}
								contentLabel="Modal" >
						<div className="modal-container">
							<figure className="modal-figure">
								<img className="modal-img" 
									 src={mountainClimbing} 
									 alt="mountain climbing"/>
								<figcaption className="modal-caption">
									Can't fetch elevation data.
								</figcaption>
							</figure>
							<div className="modal-label">
								???? m
							</div>
						</div>
						<button className="modal-button" onClick={closeModal}>
							EXPLORE OTHER FEATURES
						</button>
					</ReactModal>
				)}

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
    unselectLocation: PropTypes.func.isRequired,
  	hasError: PropTypes.bool.isRequired,
  	showModal: PropTypes.bool.isRequired,
    onError: PropTypes.func.isRequired,
  	closeModal: PropTypes.func.isRequired,
    selectedLocation: PropTypes.object
}

export default MainView