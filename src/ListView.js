import React, { Component } from 'react'
import './ListView.css'
import PropTypes from 'prop-types'

class ListView extends Component {

   /**
  	* @description Calls onInfoWindowOpen if pressed key is 'Enter'
  	* @param {object} event
  	* @param {object} location
  	*/
	onKeyPress = (event, location) => {
		if (event.key === 'Enter') {
			this.props.onInfoWindowOpen(location)
		}
	}

   /**
  	* @description Sets focus to list view if no location selected
  	*/
	componentDidUpdate() {
		if (!this.props.selectedLocation)
			this.refs.aside.focus()
	}

	render() {
		const {locations, query, isListViewOpened, isListViewAlongside, onInfoWindowOpen} = this.props

		/* Generates classList of aside dynamically based on view */
		let asideClassList
		if (isListViewOpened) {
			asideClassList = 'open'
			if (isListViewAlongside)
				asideClassList += ' alongside'
		}

		return (
			<aside ref="aside" tabindex="-1" className={asideClassList}>
				<div className="search-box" role="search">
					<input type="search"
					 	   aria-label="search text" 
					 	   className="search-input"
					 	   placeholder="Search location..."
					 	   value={query}
					 	   onChange={event => this.props.updateQuery(event.target.value)} />
			 	</div>
				<ul className="list-view">
					{locations.map((location, index) => (
						<li className="list-item" key={index} >
							<a className="list-item-link" 
							   tabIndex="0"
							   onKeyPress={(event) => this.onKeyPress(event, location)}
							   onClick={() => onInfoWindowOpen(location)} >
								{location.title} 
								{location.elevation ? ' (' + location.elevation + 'm)' : ''}
							</a>
						</li>
					))}
				</ul>
			</aside>
		)
	}
}

ListView.propTypes = {
	locations: PropTypes.array.isRequired,
    isListViewAlongside: PropTypes.bool.isRequired,
    isListViewOpened: PropTypes.bool.isRequired,
    onInfoWindowOpen: PropTypes.func.isRequired
}

export default ListView