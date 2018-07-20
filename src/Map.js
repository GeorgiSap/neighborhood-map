import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

class Map extends Component {

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
	  			/>
			))}

	  		</GoogleMap>
		)
	}
}

export default withScriptjs(withGoogleMap(Map));