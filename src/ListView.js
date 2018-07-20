import React, { Component } from 'react';

class ListView extends Component {

	render() {
		return (
			<aside>
				<input type="text" placeholder="Search..."/>
				<ul>
					{this.props.locations.map((location, index) => (
						<li key={index}>{location.title}</li>
					))}
				</ul>
			</aside>
		)
	}
}

export default ListView;