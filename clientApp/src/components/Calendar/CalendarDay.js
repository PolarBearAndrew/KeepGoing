
import React, { Component, PropTypes } from 'react';

var debug = require('debug')('app:calendar.day');

export default class CalendarDay extends Component {

	render() {

		let styles = {};

		styles.wrapper = {
			position : 'relative',
			float : 'left',
			width : '12%',
			height : '16.6%',
			margin : '1px',
			cursor : 'pointer',
			display: 'flex',
			alignItems : 'center',
			justifyContent : 'center',
		};

		if(this.props.index % 7 == 0 )
			styles.wrapper.clear = 'left';

		if(this.props.isTitle) {
			styles.wrapper.borderBottom = '2px solid black';
		}
		else {
			// 透過色差顯示工作量
			// styles.wrapper.backgroundColor = 'rgba(0, 128, 0, @op)'.replace(/@op/, Math.random());

			// 透過長條圖顯示工作量
			// styles.bar = {
			// 	position : 'absolute',
			// 	right : '0px',
			// 	bottom : '0px',
			// 	width : '100%',
			// 	height : (40 * Math.random()).toString() + 'px',
			// 	backgroundColor : 'green',
			// 	zIndex : '-1',
			// };
		}

		if(this.props.isToday) {
			styles.wrapper.paddingTop = '0px';
			styles.text = {
				width : '27px',
				height : '27px',
				border : '2px solid red',
				borderRadius : '50%',
				display: 'flex',
				alignItems : 'center',
				justifyContent : 'center',
			};
		}
		if(this.props.isSelected == true) {
			styles.text = styles.text || {};
			styles.text.color = 'blue';
			styles.text.fontWeight = 'bolder';
		}
		if(this.props.isThisMonth == false) {
			styles.wrapper.color = '#bababa';
		}

		return (
			<div
				className='days'
				style={styles.wrapper}
				key={this.props.date}
				onClick={this.handleClick.bind(this)}
			>
				{
					// <div style={styles.bar}></div>
				}
				<div style={styles.text}>{this.props.text}</div>
			</div>
		);
	}

	handleClick(e) {
		if(
			this.props.onChange &&
			this.props.isTitle == false
		) {
			let info = {
				date : this.props.date,
				color : this.props.color,
				statistic : this.props.statistic,
			};
			return this.props.onChange(info);
		}
		else {
			return false;
		}
	}

}

CalendarDay.propTypes = {
	// func
	onChange : PropTypes.func,
	// var
	text : PropTypes.string.isRequired,
	isTitle : PropTypes.bool.isRequired,
	date : PropTypes.string,
	color : PropTypes.string,
	isToday : PropTypes.bool,
	statistic : PropTypes.number,
	isThisMonth : PropTypes.bool,
};
