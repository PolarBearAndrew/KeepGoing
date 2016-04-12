
import React, { Component, PropTypes } from 'react';

export default class MenuItem extends Component {

	render() {

		let className = 'item ';
		if(this.props.active) {
			className += 'active';
		}
		return (
			<a
				className={ className }
				onClick={this.props.setDateFilter}
			>
				{this.props.text}
			</a>
		);
	}
}

MenuItem.propTypes = {
	text : PropTypes.string.isRequired,
	active : PropTypes.bool,
};
