
import React, { Component, PropTypes } from 'react';

import { Width } from '../../config/Styles.js';
import _PRIORITYS_ from '../../config/Priority.js';

let TodoItem = React.createClass({

	getInitialState() {
		return {
			hoverCheckIcon: false,
		};
	},

	render() {

		let styles = {};
		let checkIconClass;
		const expectTime = moment(this.props.expectTime);

		styles.segment = {
			width : Width.MAIN_CONTENT.toString() + 'px',
		};
		styles.checkIcon = {
			cursor : 'pointer',
		};
		// 是否擁有 priority 標籤
		if(this.props.priority > 0 )
			styles.title = { marginTop : '-27px' };
		else
			styles.title = null;

		if(
			this.state.hoverCheckIcon ||
			this.props.completed == true
		) {
			checkIconClass = 'check icon green';
			styles.segment.opacity = 0.5;
		}
		else {
			checkIconClass = 'check icon disabled';
		}

		return (
			<div
				className='ui segment'
				style={styles.segment}>

				{this.priorityRibon(this.props.priority)}

				<h3
					className='ui header'
					style={styles.title}
				>
					<i
						className={checkIconClass}
						style={styles.checkIcon}
						onClick={this.props.onComplete}
						onMouseOver={this.mouseOver}
						onMouseOut={this.mouseOut}
					></i>
					<div className='content'>{this.props.title}</div>
				</h3>

				<div className='ui grid'>
					<div className='one wide column'></div>
					<div className='three wide column'>
						<i className='clock icon large'></i>
						{this.parseTimeStr(this.props.needTime)}
					</div>
					<div className='seven wide column'>
						<i className='calendar icon large'></i>
						{expectTime.format('YYYY/MM/DD dddd')}
						&nbsp;
						{' (' + expectTime.fromNow() + ')'}
					</div>
				</div>

			</div>
		);

	},

	mouseOver() {
		this.setState({hoverCheckIcon: true});
	},

	mouseOut() {
		this.setState({hoverCheckIcon: false});
	},

	priorityRibon() {
		let priority = this.props.priority;
		if(priority <= 0) {
			return null;
		}
		if(priority > 4) {
			priority = 4;
		}
		let target = _PRIORITYS_[priority];
		return (
			<a
				className={"ui right ribbon label " + target.color}
				onClick={this.props.setPriorityFilter.bind(null, priority)}
			>
				<i className={"icon " + target.icon}></i>
				{target.text}
			</a>
		);
	},

	parseTimeStr(needTime) {
		if(needTime < 60) {
			return needTime.toString() + ' min';
		}
		else {
			let hr = Math.ceil(needTime / 60 * 10) / 10; // 小數點第一位
			return (hr).toString() + ' hr';
		}
	},

	propTypes : {
		// func
		onComplete : PropTypes.func.isRequired,
		setPriorityFilter : PropTypes.func.isRequired,

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
	},

});

export default TodoItem;
