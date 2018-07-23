const API_URL = "https://maps.googleapis.com/maps/api/elevation/json"
const GOOGLE_MAPS_KEY = "AIzaSyCOIb8tce725I3evjOt185ooz0A4UgsK1s"

export const fetchElevationData = (app) => {
	fetch(buildRequestURL(app))
	.then(response => response.json())
	.then(data => {
		if (data.results) {
			app.setState(prevState => ({
				locations : prevState.locations.map((location, index) => {
					if (data.results[index] && data.results[index].elevation)
						location.elevation = Math.round(data.results[index].elevation)
					return location
				})	
			}))
		}
	})
	.catch(error => console.log('Unable to fetch elevation data'))
}

const buildLocationsParam = (app) => {
	let param = ''
	app.state.locations.forEach((location, index) => {
		param += location.position.lat + ',' + location.position.lng
		if (index < app.state.locations.length - 1) {
			param += '|'
		}
	})
	return param
}

const buildRequestURL = (app) => {
	let url = new URL(API_URL),
	params = {
		locations: buildLocationsParam(app), 
		key: GOOGLE_MAPS_KEY
	}
	Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
	return url
}


