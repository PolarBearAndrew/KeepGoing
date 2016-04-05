
import React, { Component, PropTypes } from 'react';

// import Dates from './dates.js';
import Calendar from './Calendar.js';

var debug = require('debug')('app:calendar');

let WeekDates = [
	{ text : 'Mo' },
	{ text : 'Tu' },
	{ text : 'We' },
	{ text : 'Th' },
	{ text : 'Fr' },
	{ text : 'Sa' },
	{ text : 'Su' }
];

let DatePicker = React.createClass({

	getInitialState() {
		return {
			showDatePicker : false,
		};
	},

	render() {

		let value = moment(this.props.value).format('YYYY-MM-DD dddd');

		let styles = {};

		styles.input = {
			position : 'relative',
		};

		return (
			<div className="ui left icon input transparent large">
				<input
					type="text"
					defaultValue={value}
					style={styles.input}
					onFocus={this.handleFocus}
				/>
				{
					this.state.showDatePicker == true
					? this.showCalendar()
					: null
				}
				<i className="calendar icon"></i>
			</div>
		);
	},

	showCalendar() {

		let styles = {};

		styles.wrapper = {
			position : 'absolute',
			top : '15px',
			left : '20px',
			width : '237px',
			zIndex : '99',
		};

		styles.calendar = {
			height : '165px',
			width : '225px',
		};

		return (
			<div className="ui raised segment" style={styles.wrapper}>
				<Calendar
					style={styles.calendar}
					WeekDates={WeekDates}
				/>
				<p></p>
			</div>
		);
	},

	handleFocus() {
		this.setState({ showDatePicker : true });
	}

});

export default DatePicker;
