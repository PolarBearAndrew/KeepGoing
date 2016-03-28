
import React, { Component, PropTypes } from 'react';

export default class TodoPanel extends Component {

	render() {

		let styles = {};

		styles.segment = {
			width : '425px',
		};

		return (
			<div
				style={styles.segment}
				className="ui stacked segment"
			>
			<h2 className="ui header">
				<i className="certificate icon yellow"></i>
				<div className="content">
					{this.props.title}
					<div className="sub header">{'# ' + this.props.todoId}</div>
				</div>
				</h2>
			</div>
		);
	}


}

TodoPanel.propTypes = {
	id : PropTypes.number,
	title : PropTypes.string,
	completed : PropTypes.bool,
	priority : PropTypes.number,
	needTime : PropTypes.number,
	expectAt : PropTypes.string,
	desc : PropTypes.string,
	endAt : PropTypes.string,
};
