import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import StreetView from './StreetView.js'
import PropTypes from 'prop-types'

class Map extends Component {

	state = {
		streetViewStatus: 'OK'
	}

   /**
  	* @description Resets the initial state of streetViewStatus to 'OK'
  	*/
	setInitialStreetViewStatus = () => {
		this.setState({streetViewStatus : 'OK'})
	}

   /**
  	* @description Calls setInitialStreetViewStatus and onInfoWindowOpen
  	* @param {object} location
  	*/
	onInfoWindowOpen = location => {
		this.setInitialStreetViewStatus()
		this.props.onInfoWindowOpen(location)
	}

   /**
  	* @description Sets streetViewStatus state on change
  	* @param {string} streetViewStatus
  	*/
	onStatusChanged = streetViewStatus => {
		this.setState({streetViewStatus})
	}

   /**
  	* @description Calculates bounds and fits map
  	*/
  	componentDidMount () {
  		if (window.google) {
  			const bounds = new window.google.maps.LatLngBounds()
  			this.props.locations.forEach((location) => {
  				bounds.extend(location.position)
  			})
  			this.refs.map.fitBounds(bounds)
  		}
  	}

	render() {
		const {locations, selectedLocation, unselectLocation} = this.props
		const {streetViewStatus} = this.state
		const GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDKNp06ztya3-x0j2-LkXrgiePek-yv1Qw&v=3.exp&libraries=geometry,drawing,places'

		return (
	      	<GoogleMap
	      		ref='map'
		        defaultZoom={11} 
			    defaultCenter={{
			      lat: 42.133322,
			      lng: 23.5499485 
			    }}
			    defaultMapTypeId='terrain'
			    clickableIcons={true}
			    options={{ mapTypeControl: false }}
	  		>

	  		{locations.map((location, index) => (
	  			<Marker
	  				key={index}
	  				title={location.title}
	  				position={location.position}
	  				animation={(selectedLocation === location) && window.google &&
	  					window.google.maps.Animation.BOUNCE}
	  				onClick={() => this.onInfoWindowOpen(location)} >
	  				{selectedLocation === location &&
		  				<InfoWindow onCloseClick={unselectLocation}>
	  						<div>
			  					<h3>
			  						{location.title}
			  						{location.elevation ? ' (' + location.elevation + 'm)' : ''}
			  					</h3>
			  					{streetViewStatus === 'OK' ?
				  					<div style={{
			                      		width: '268px',
			                      		height: '268px',}} >
			   						
			   							<StreetView 
							                onStatusChanged ={this.onStatusChanged}
							                apiKey={GOOGLE_MAPS_API_URL}
							                streetViewPanoramaOptions={{
							                  position: location.position,
							                  pov: {heading: 100, pitch: 0},
							                  zoom: 1
							                }} />
				                	</div>
			                	: <h4><i>(No street view available)</i></h4>}
		                	</div>
		  				</InfoWindow>
	  				}

	  			</Marker>
			))}

	  		</GoogleMap>
		)
	}
}

Map.propTypes = {
	locations: PropTypes.array.isRequired,
    onInfoWindowOpen: PropTypes.func.isRequired,
    unselectLocation: PropTypes.func.isRequired
}

export default withScriptjs(withGoogleMap(Map))