
import React, { Component, PropTypes } from 'react';
import MenuItem from './MenuItem.js';
import _LeftMenu from '../../config/LeftMenu.js';

import { Width } from '../../config/Styles';

export default class LeftMenu extends Component {

	render() {

		let styles = {};

		styles.menu = {
			marginLeft : '18px',
		};

		return (
			<div className="ui vertical fluid tabular menu" style={styles.menu}>
				{
					_LeftMenu.map( (item) =>
						<MenuItem
							key={item.key}
							active={this.props.dateFilter == item.key}
							setDateFilter={ e => this.props.setDateFilter(item.key)}
							{...item}
						/>
					)
				}
			</div>
		);
	}

}

LeftMenu.propTypes = {
	setDateFilter: PropTypes.func.isRequired,
};
