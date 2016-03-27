
import React, { Component, PropTypes } from 'react';

import _PRIORITYS_ from '../../config/Priority.js';
import { Width } from '../../config/Styles.js';

import moment from 'moment';

let TodoItem = React.createClass({

	getInitialState() {
		return {
			hoverCheckIcon: false,
		};
	},

	render() {

		let styles = {};
		let checkIconClass;
		let expectTime = moment(this.props.expectAt);
		let hover = this.state.hoverCheckIcon;
		let completed = this.props.completed;

		styles.segment = {
			width : Width.MAIN_CONTENT.toString() + 'px',
		};
		styles.checkIcon = {
			cursor : 'pointer',
		};
		// 是否擁有 priority 標籤
		if(this.showPriorityRibon())
			styles.title = { marginTop : '-27px' };
		else
			styles.title = null;


		// icon status
		if(hover && completed) {
			checkIconClass = 'undo icon orange';
		}
		else if(hover && completed == false) {
			checkIconClass = 'check icon green';
		}
		else if(hover == false && completed) {
			checkIconClass = 'check icon green';
			styles.segment.opacity = 0.6;
		}
		else if(hover == false && completed == false) {
			checkIconClass = 'check icon disabled';
		}

		return (
			<div
				className='ui segment'
				style={styles.segment}>

				{
					this.showPriorityRibon()
						? this.buildPriorityRibon(this.props.priority)
						: null
				}

				<h3
					className='ui header'
					style={styles.title}
				>
					<i
						className={checkIconClass}
						style={styles.checkIcon}
						onClick={
							this.props.completed
							? this.props.onUndo
							: this.props.onComplete
						}
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
						{
							expectTime.format('YYYY/MM/DD dddd')
							// expectTime.format('YYYY/MM/DD dddd HH:mm')
						}
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

	showPriorityRibon() {
		let priority = this.props.priority;
		let target = _PRIORITYS_[priority];
		if(target.text == '無優先權')
			return false;
		else
			return true;
	},

	buildPriorityRibon(priority) {
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
		onUndo : PropTypes.func.isRequired,
		setPriorityFilter : PropTypes.func.isRequired,
		// variable
		id : PropTypes.number.isRequired,
		title : PropTypes.string.isRequired,
		completed : PropTypes.bool.isRequired,
		priority : PropTypes.number.isRequired,
		needTime : PropTypes.number.isRequired,
		expectAt : PropTypes.string.isRequired,
		// not required
		desc : PropTypes.string,
		endAt : PropTypes.string,
	},

});

export default TodoItem;
