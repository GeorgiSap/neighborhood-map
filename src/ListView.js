import React, { Component } from 'react'
import './ListView.css'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import PropTypes from 'prop-types'

class ListView extends Component {

	state = {
		query: ''
	}

   /**
  	* @description Updates state of search query
  	* @param {string} query
  	*/
	updateQuery = query => {
		this.setState({query})
	}	

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
  	* @description Sets focus to seatch box
  	*/
	componentDidUpdate() {
		this.refs.search.focus()
	}

	render() {
		const {locations, isListViewOpened, isListViewAlongside, onInfoWindowOpen} = this.props
		const {query} = this.state

		/* Filters showing locations based on search query */
		let showingLocations
		if (query) {
			const match = new RegExp(escapeRegExp(query), 'i')
			showingLocations = locations.filter(location => 
				match.test(location.title))
		} else {
			showingLocations = locations
		}

		/* Sorts showing locations by title */
		showingLocations.sort(sortBy('title'))

		/* Generates classList of aside dynamically based on view */
		let asideClassList
		if (isListViewOpened) {
			asideClassList = 'open'
			if (isListViewAlongside)
				asideClassList += ' alongside'
		}

		return (
			<aside className={asideClassList}>
				<div className="search-box"
					 role="search">
					<input ref="search"
						   type="search"
					 	   aria-label="search text" 
					 	   className="search-input"
					 	   placeholder="Search location..."
					 	   value={query}
					 	   onChange={event => this.updateQuery(event.target.value)} />
			 	</div>
				<ul className="list-view">
					{showingLocations.map((location, index) => (
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