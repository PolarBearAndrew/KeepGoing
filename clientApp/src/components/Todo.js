import React, { Component, PropTypes } from 'react';

export default class Todo extends Component {

	render() {

		let styles = {};

		styles.segment = {
			width : '900px',
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

Todo.propTypes = {

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
