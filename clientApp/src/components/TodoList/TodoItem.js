
import React, { Component, PropTypes } from 'react';

import { Width } from '../../config/Styles';

export default class TodoItem extends Component {

	render() {

		let styles = {};

		styles.segment = {
			width : Width.MAIN_CONTENT.toString() + 'px',
		};

		styles.checkIcon = {
			cursor : 'pointer',
		};

		styles.title = {

		};

		return (
			<div
				className='ui segment'
				style={styles.segment}>

				<h3
					className='ui header'
					style={styles.title}
				>
					<i className='check icon big' style={styles.checkIcon}></i>
					<div className='content'>{this.props.title}</div>
				</h3>

			</div>
		);
	}

}

TodoItem.propTypes = {

	// func
	// onClick : PropTypes.func.isRequired,
	// onCheck : PropTypes.func.isRequired,

	// props
	// is required
	id : PropTypes.number.isRequired,
	title : PropTypes.string.isRequired,
	completed : PropTypes.bool.isRequired,
	priority : PropTypes.number.isRequired,
	// not required
	desc : PropTypes.string,
	endAt : PropTypes.string,
	needTime : PropTypes.string,
	expectTime : PropTypes.string,
};


// {
// 	// <li onClick={this.props.onClick}>
// 	// 	{this.props.text}
// 	// </li>
// }
