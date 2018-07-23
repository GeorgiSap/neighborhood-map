import React, { Component } from 'react';
import './ListView.css';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class ListView extends Component {

	state = {
		query: ''
	}

	updateQuery = query => {
		this.setState({query})
	}	

	componentDidUpdate() {
		this.refs.search.focus()
	}

	render() {
		let showingLocations
		if (this.state.query) {
			const match = new RegExp(escapeRegExp(this.state.query), 'i')
			showingLocations = this.props.locations.filter(location => 
				match.test(location.title))
		} else {
			showingLocations = this.props.locations
		}

		showingLocations.sort(sortBy('title'))

		let asideClassList;
		if (this.props.isListViewOpened) {
			asideClassList = 'open'
			if (this.props.isListViewAlongside)
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
					 	   value={this.state.query}
					 	   onChange={event => this.updateQuery(event.target.value)} />
			 	</div>
				<ul className="list-view">
					{showingLocations.map((location, index) => (
						<li className="list-item" key={index} >
							<a className="list-item-link" tabIndex="0" onClick={() => this.props.openInfoWindow(location)} >
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

export default ListView;