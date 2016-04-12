
import React, { Component, PropTypes } from 'react';

import _TYPES_ from '../../config/TodoTypes.js';
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
		let segmentClass = 'ui segment ' + this.getTypeColor();
		let expectTime = moment(this.props.expectAt);
		let hover = this.state.hoverCheckIcon;
		let completed = this.props.completed;

		styles.segment = {
			width : Width.MAIN_CONTENT.toString() + 'px',
			// cursor : 'pointer',
		};
		styles.checkIcon = {
			cursor : 'pointer',
		};
		styles.editIcon = {
			float : 'right',
			cursor : 'pointer',
		};
		styles.iconFloatRight = {
			float : 'right',
		};


		// 是否擁有 type 標籤
		if(this.showTypeRibon())
			styles.title = { marginTop : '-27px' };
		else
			styles.title = null;


		// icon status
		if(hover && completed) {
			checkIconClass = 'undo icon orange';
			segmentClass += ' secondary';
		}
		else if(hover && completed == false) {
			checkIconClass = 'check icon green';
		}
		else if(hover == false && completed) {
			checkIconClass = 'check icon green';
			styles.segment.opacity = 0.6;
			segmentClass += ' secondary';
		}
		else if(hover == false && completed == false) {
			checkIconClass = 'check icon disabled';
		}

		return (
			<div
				className={segmentClass}
				style={styles.segment}
				onClick={this.props.setCurrentTodo}
			>
				{
					this.showTypeRibon()
						? this.buildTypeRibon(this.props.type)
						: null
				}
				<h3
					className='ui header'
					style={styles.title}
				>
					<i
						className={checkIconClass}
						style={styles.checkIcon}
						onClick={ e => {
							e.stopPropagation();
							this.props.completed
							? this.props.onUndo()
							: this.props.onComplete();
						}

						}
						onMouseOver={this.mouseOver}
						onMouseOut={this.mouseOut}
					></i>
					<div className='content'>
						{this.props.title}
						{
							this.props.type == 'daily'
							? <a
								style={styles.iconFloatRight}
								className="ui purple circular label"
								>
									{ 'Day : ' + (this.props.counter+1) }
								</a>
							: null
						}
					</div>
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
							// expectTime.calendar()
							// expectTime.format('YYYY/MM/DD dddd HH:mm')
						}
						&nbsp;
						{this.getTimeFromNow(expectTime, this.props.completed)}
					</div>
					<div className='five wide column'>
						<i
							style={styles.editIcon}
							className='write icon gray'
							onClick={this.props.setCurrentTodo}
						></i>
						{
							this.props.desc
							? <i
									style={styles.iconFloatRight}
									className='file text outline icon'
								></i>
							: null
						}
					</div>
				</div>

			</div>
		);

	},

	mouseOver() {
		this.setState({hoverCheckIcon: true});
		return false;
	},

	mouseOut() {
		this.setState({hoverCheckIcon: false});
		return false;
	},

	showTypeRibon() {
		if(this.props.type == 'none')
			return false;
		else
			return true;
	},

	getTypeColor() {
		return _TYPES_[this.props.type].color;
	},

	buildTypeRibon(type) {
		let target = _TYPES_[type];
		return (
			<a
				className={"ui right ribbon label " + target.color}
				onClick={this.props.setTypeFilter.bind(null, type)}
			>
				<i className={"icon " + target.icon}></i>
				{target.text}
			</a>
		);
	},

	getTimeFromNow(expectTime, completed) {
		let t = expectTime.fromNow();
		let style = {};
		// 已經完成
		if(completed) {
			style.color = 'gray';
		}
		// 一天之前的工作
		else if(moment(expectTime).isBefore(moment(), 'day')) {
			style.color = 'red';
		}
		// 一天之後的工作
		else if(moment(expectTime).isAfter(moment(), 'day')) {
			style.color = 'blue';
		}
		// 今天
		else {
			style.color = 'green';
			style.fontWeight = 'bolder';
		}
		return (
			<a style={style}>
				{' (' + t  + ')'}
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
		setTypeFilter : PropTypes.func.isRequired,
		setCurrentTodo : PropTypes.func.isRequired,
		onComplete : PropTypes.func.isRequired,
		onUndo : PropTypes.func.isRequired,
		// variable
		id : PropTypes.number.isRequired,
		title : PropTypes.string.isRequired,
		completed : PropTypes.bool.isRequired,
		type : PropTypes.string.isRequired,
		needTime : PropTypes.number.isRequired,
		expectAt : PropTypes.string.isRequired,
		counter : PropTypes.number.isRequired,
		// not required
		desc : PropTypes.string,
		endAt : PropTypes.string,
	},

});

export default TodoItem;
