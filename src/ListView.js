import React, { Component } from 'react';
import './ListView.css';
import escapeRegExp from 'escape-string-regexp';

class ListView extends Component {

	state = {
		query: ''
	}

	updateQuery = query => {
		this.setState({query})
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

		let asideClassList;
		if (this.props.isListViewOpened) {
			asideClassList = 'open'
			if (this.props.isListViewAlongside)
				asideClassList += ' alongside'
		}

		return (
			<aside className={asideClassList}>
				<input 
				 className="search-input"
				 type="text" 
				 placeholder="Search..."
				 value={this.state.query}
				 onChange={event => this.updateQuery(event.target.value) } />
				<ul className="list-view">
					{showingLocations.map((location, index) => (
						<li className="list-item" key={index}>
							<a onClick={() => this.props.openInfoWindow(location)} >
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