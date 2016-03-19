
import React, { Component, PropTypes } from 'react';
import moment from 'moment';
moment.locale('zh-TW');

import { Width } from '../../config/Styles.js';
import _PRIORITYS_ from '../../config/Priority.js';


export default class TodoItem extends Component {

	render() {

		let styles = {};

		styles.segment = {
			width : Width.MAIN_CONTENT.toString() + 'px',
		};

		styles.checkIcon = {
			cursor : 'pointer',
		};

		// 是否擁有 priority 標籤
		if(this.props.priority > 0 ) {
			styles.title = { marginTop : '-27px' };
		}
		else {
			styles.title = null;
		}

		const expectTime = moment(this.props.expectTime);

		return (
			<div
				className='ui segment'
				style={styles.segment}>

				{priorityRibon(this.props.priority)}

				<h3
					className='ui header'
					style={styles.title}
				>
					<i className='check icon' style={styles.checkIcon}></i>
					<div className='content'>{this.props.title}</div>
				</h3>

				<div className='ui grid'>
					<div className='one wide column'></div>
					<div className='three wide column'>
						<i className='clock icon large'></i>
						{parseTimeStr(this.props.needTime)}
					</div>
					<div className='seven wide column'>
						<i className='calendar icon large'></i>
						{expectTime.format('YYYY/MM/DD dddd')}
						&nbsp;
						{', (' + expectTime.fromNow() + ')'}
					</div>
				</div>

			</div>
		);
	}

}

function priorityRibon(priority) {
	if(priority <= 0) {
		return null;
	}
	if(priority > 4) {
		priority = 4;
	}
	let target = _PRIORITYS_[priority];
	return (
		<a className={"ui right ribbon label " + target.color}>
			<i className={"icon " + target.icon}></i>
			{target.text}
		</a>
	);
}

function parseTimeStr(needTime) {
	if(needTime < 60) {
		return needTime.toString() + ' min';
	}
	else {
		let hr = Math.ceil(needTime / 60 * 10) / 10; // 小數點第一位
		return (hr).toString() + ' hr';
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
	needTime : PropTypes.number,
	expectTime : PropTypes.string,
};


// {
// 	// <li onClick={this.props.onClick}>
// 	// 	{this.props.text}
// 	// </li>
// }
