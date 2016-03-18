
import React, { Component, PropTypes } from 'react';

import { Width } from '../../config/Styles';

export default class TodoItem extends Component {

	render() {

		let styles = {};

		styles.segment = {
			width : Width.MAIN_CONTENT.toString() + 'px',
		};

		return (
			<div
				className="ui segment"
				style={styles.segment}>
				{this.props.text}
			</div>
		);
	}

}

TodoItem.propTypes = {

	// func
	onClick : PropTypes.func.isRequired,
	onCheck : PropTypes.func.isRequired,

	// props
	text: PropTypes.string.isRequired,
	completed: PropTypes.bool.isRequired
};


// {
// 	// <li onClick={this.props.onClick}>
// 	// 	{this.props.text}
// 	// </li>
// }
