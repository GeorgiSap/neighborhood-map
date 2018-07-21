import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

class Map extends Component {

	state = {
		selectedLocation: null
	}

	openInfoWindow = (event, location) => {
		this.setState({selectedLocation : location})
	}

	render() {
		return (
	      	<GoogleMap
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
		  					<h3>{location.title}</h3>
		  				</InfoWindow>
	  				}

	  			</Marker>
			))}

	  		</GoogleMap>
		)
	}
}

export default withScriptjs(withGoogleMap(Map));