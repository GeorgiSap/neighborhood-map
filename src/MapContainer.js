import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Map from './Map.js'
import nointernet from './img/nointernet.png'
import './MapContainer.css'

class MapContainer extends Component {

	componentDidCatch(error, info) {
		this.props.onError()
	}

	render() {
		const {locations, onInfoWindowOpen, selectedLocation, unselectLocation, hasError} = this.props
		const GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDKNp06ztya3-x0j2-LkXrgiePek-yv1Qw&v=3.exp&libraries=geometry,drawing,places'
		
		const containerElementStyle = {
			height: `calc(100% - 3em)`,
			width: `100%`,
			position: `relative`, 
			textAlign: `center`
		}

		const mapElementStyle = {
			position: `absolute`, 
			height: `100%`, 
			width: `100%`
		}

		const loadingElementStyle = {
			height: `100%`
		}
		


		return (
			!hasError ? 
			    <Map
			    	locations={locations}
			    	onInfoWindowOpen={onInfoWindowOpen}
			    	selectedLocation={selectedLocation}
			    	unselectLocation={unselectLocation}
				    googleMapURL={GOOGLE_MAPS_API_URL}
			      	containerElement={
			      		<div aria-label="location" 
			      			 role="application" 
			      			 style={containerElementStyle} />
			      	}
					mapElement={
						<div style={mapElementStyle} />
					}
			      	loadingElement={
			      		<div style={loadingElementStyle}/>
			      	}
				/>
			: 	
				<div className="error-container">
					<div className="error-div">
						<img className="error-img" 
							 src={nointernet} 
							 alt="Slow or no internet connection" />
					</div>		
				</div>
    
		)
	}
}

MapContainer.propTypes = {
	locations: PropTypes.array.isRequired,
    onInfoWindowOpen: PropTypes.func.isRequired,
    unselectLocation: PropTypes.func.isRequired,
    hasError: PropTypes.bool.isRequired,
    selectedLocation: PropTypes.object
}

export default MapContainer