import React, { Component } from 'react';
import './ListView.css';

class ListView extends Component {

	render() {
		return (
			<aside className="list-section">
				<input className="search-input" type="text" placeholder="Search..."/>
				<ul className="list-view">
					{this.props.locations.map((location, index) => (
						<li className="list-item" key={index}>{location.title}</li>
					))}
				</ul>
			</aside>
		)
	}
}

export default ListView;