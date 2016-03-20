
import React, { Component, PropTypes } from 'react';

import { Width } from '../config/Styles';

export default class NavBar extends Component {

	render() {

		let styles = {};

		styles.navbar = {
			width : Width.MAIN_CONTENT.toString() + 'px',
		};

		return (

			<div className="ui menu labeled icon" style={styles.navbar}>

				<div className="item">
					<i className="coffee icon"></i>
					KEEP GOING
				</div>

				{
					// <a className="item">
					// 	<i className="bar chart icon"></i>
					// </a>
					// right menu
					// <div className="right menu">
					// 	<a className="item">Sign Up</a>
					// 	<a className="item">Help</a>
					// </div>
				}

			</div>
		);
	}

}
