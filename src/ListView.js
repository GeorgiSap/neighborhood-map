import React, { Component } from 'react'
import './ListView.css'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import PropTypes from 'prop-types'

class ListView extends Component {

	state = {
		query: ''
	}

	updateQuery = query => {
		this.setState({query})
	}	

	onKeyPress = (event, location) => {
		if (event.key === 'Enter') {
			this.props.onInfoWindowOpen(location)
		}
	}

	componentDidUpdate() {
		this.refs.search.focus()
	}

	render() {
		const {locations, isListViewOpened, isListViewAlongside, onInfoWindowOpen} = this.props
		const {query} = this.state


		let showingLocations
		if (query) {
			const match = new RegExp(escapeRegExp(query), 'i')
			showingLocations = locations.filter(location => 
				match.test(location.title))
		} else {
			showingLocations = locations
		}

		showingLocations.sort(sortBy('title'))

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