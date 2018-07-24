import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Map from './Map.js'
import nointernet from './img/nointernet.png'

class MapContainer extends Component {

	state = {
		hasError: false
	}

	componentDidCatch(error, info) {
		this.setState({hasError: true}) 
	}

	render() {
		const {locations, onInfoWindowOpen, selectedLocation, unselectLocation} = this.props
		const GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDKNp06ztya3-x0j2-LkXrgiePek-yv1Qw&v=3.exp&libraries=geometry,drawing,places'
		
		return (
			!this.state.hasError ? 
			    <Map
			    	locations={locations}
			    	onInfoWindowOpen={onInfoWindowOpen}
			    	selectedLocation={selectedLocation}
			    	unselectLocation={unselectLocation}
				    googleMapURL={GOOGLE_MAPS_API_URL}
			      	containerElement={<div aria-label="location" role="application" style={{height: `calc(100% - 3em)`, width: `100%`, position: `relative`, textAlign: `center` }} />}
					mapElement={<div style={{ position: `absolute`, height: `100%`, width: `100%`}} />}
			      	loadingElement={<div style={{ height: `100%` }}/>}
				/>
			: 	
				<div style={{height: `calc(100% - 3em)`, width: `100%`, position: `relative`, textAlign: `center` }}>
					<div style={{verticalAlign: `middle`, position: `absolute`, height: `100%`, width: `100%`}}>
						<img style={{position: `relative`, top: `50%`, transform: `translateY(-50%)`, objectFit: `cover`, verticalAlign: `middle`, margin: `0 auto`, display: `inline`, width: `261px`, height: `300px`, maxWidth: `100%`, maxHeight: `100%`}} src={nointernet} alt="Slow or no internet connection" />
					</div>		
				</div>
    
		)
	}
}

MapContainer.propTypes = {
	locations: PropTypes.array.isRequired,
    onInfoWindowOpen: PropTypes.func.isRequired,
    unselectLocation: PropTypes.func.isRequired,
    selectedLocation: PropTypes.object
}

export default MapContainer