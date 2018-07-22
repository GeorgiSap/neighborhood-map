import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

class Map extends Component {

	state = {
		selectedLocation: null
	}

	openInfoWindow = (event, location) => {
		this.setState({selectedLocation : location})
	}

	componentDidMount () {
		const bounds = new window.google.maps.LatLngBounds()
		this.props.locations.forEach((location) => {
			bounds.extend(location.position)
		})
		this.refs.map.fitBounds(bounds)
	}

	render() {
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

	  		{this.props.locations.map((location, index) => (
	  			<Marker
	  				key={index}
	  				title={location.title}
	  				position={location.position}
	  				onClick={event => this.openInfoWindow(event, location)}
	  			>
	  				{this.state.selectedLocation === location &&
		  				<InfoWindow>
		  					<h3>
		  						{location.title}
		  						{location.elevation ? ' (' + location.elevation + 'm)' : ''}
		  					</h3>
		  				</InfoWindow>
	  				}

	  			</Marker>
			))}

	  		</GoogleMap>
		)
	}
}

export default withScriptjs(withGoogleMap(Map));