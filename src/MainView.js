import React, { Component } from 'react';
import './MainView.css';

class MainView extends Component {

	render() {
		let mainClassName;
		if (this.props.isListViewAlongside) 
			mainClassName = 'alongside'
		if (this.props.isMainDarkened) 
			mainClassName = 'darken'

		return (
			<main className={mainClassName} onClickCapture={this.props.onMainClick} >
				<header>
					<button className="hamburger" onClick={this.props.onHamburgerClick}>☰</button>
					<h1 className="header-heading"><span className="header-icon">⛰</span> Rila Mountain Sites</h1>
				</header>
			</main>
		)
	}
}

export default MainView;