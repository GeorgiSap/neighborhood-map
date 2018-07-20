import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";

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
  		/>
	)
}






}

export default withScriptjs(withGoogleMap(Map));