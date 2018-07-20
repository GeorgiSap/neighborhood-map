import React, { Component } from 'react';
import './MainView.css';

class MainView extends Component {

	render() {
		return (
			<main>
				<header>
					<button className="hamburger">☰</button>
					<h1 className="header-heading"><span className="header-icon">⛰</span> Rila Mountain Sites</h1>
				</header>
			</main>
		)
	}
}

export default MainView;