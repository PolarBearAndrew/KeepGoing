
import React, { Component, PropTypes } from 'react';

import { Width } from '../config/Styles';

export default class LeftMenu extends Component {

	render() {

		let styles = {};

		styles.menu = {
			marginLeft : '18px',
		};

		return (
			<div className='four wide column'>

				<div className="ui vertical fluid tabular menu" style={styles.menu}>
					<a className="item">
						Bio
					</a>
					<a className="item">
						Pics
					</a>
					<a className="item">
						Companies
					</a>
					<a className="item active">
						Links
					</a>
				</div>

			</div>
		);
	}

}
