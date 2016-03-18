
import React, { Component, PropTypes } from 'react';
import MenuItem from './MenuItem.js';

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
					this.props.menuList.map( (item) =>
						<MenuItem
							key={item.id}
							{...item}
						/>
					)
				}
			</div>
		);
	}

}

LeftMenu.propTypes = {
	// onTodoClick: PropTypes.func.isRequired,
	menuList: PropTypes.arrayOf(PropTypes.shape({
		text: PropTypes.string.isRequired,
		active: PropTypes.bool
	}).isRequired).isRequired
};
