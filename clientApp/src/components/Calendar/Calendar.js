
import React, { Component, PropTypes } from 'react';

import Dates from './dates.js';
import CalendarDay from './CalendarDay.js';

var debug = require('debug')('app:calendar');

let WeekDates = [
	{ text : 'Mon' },
	{ text : 'Tue' },
	{ text : 'Wed' },
	{ text : 'Thu' },
	{ text : 'Fri' },
	{ text : 'Sat' },
	{ text : 'Sun' }
];

export default class Calendar extends Component {

	render() {

		let styles = {};

		styles.wrapper = {
			height : '270px',
			width : '100%',
			marginTop : '8px',
			marginLeft : '33px',
		};

		return (
			<div style={styles.wrapper}>
				{
					WeekDates.map( (d, index) => {
						return (
							<CalendarDay
								index={index}
								isTitle={true}
								key={d.text}
								{...d}
							/>
						);
					})
				}
				{
					Dates.map( (d, index) => {
						return (
							<CalendarDay
								index={index}
								isTitle={false}
								key={d.date}
								{...d}
							/>
						);
					})
				}
			</div>
		);
	}

}

// Calendar.propTypes = {
// 	// onTodoClick: PropTypes.func.isRequired,
// 	menuList: PropTypes.arrayOf(PropTypes.shape({
// 		text: PropTypes.string.isRequired,
// 		active: PropTypes.bool
// 	}).isRequired).isRequired
// };
