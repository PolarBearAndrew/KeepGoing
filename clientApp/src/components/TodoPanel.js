
import React, { Component, PropTypes } from 'react';

import _PRIORITYS_ from '../config/Priority.js';

export default class TodoPanel extends Component {

	render() {

		let styles = {};
		let priority = _PRIORITYS_[this.props.priority];

		styles.segment = {
			width : '425px',
		};

		styles.needTimeControls = {
			float : 'left',
		};

		return (
			<div
				style={styles.segment}
				className="ui stacked segment"
			>

				<h2 className="ui header">
					<i className={"icon  " +  priority.icon + ' ' + priority.color}></i>
					<div className="content">
						{this.props.title}
						<div className="sub header">{'# ' + this.props.todoId}</div>
					</div>
				</h2>

				<h4 className="ui inverted divider"></h4>

				<div className='ui grid'>

					<div className='one wide column'></div>

					<div className='ten wide column'>
						<div className="ui left icon input transparent large">
							<input type="text" value={moment(this.props.expectAt).format('YYYY-MM-DD dddd')} />
							<i className="calendar icon"></i>
						</div>
					</div>

					<div className='three wide column'>
						<div className="ui left icon input transparent large">
							<input type="number" value={this.props.needTime} />
							<i className="clock icon"></i>
						</div>
					</div>
				</div>

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
