
var moment = require('moment');

var data = [];

var startOfDay = moment().startOf("month");
var endOfDay = moment().endOf("month");

var lastMonthNums = parseInt(startOfDay.isoWeekday(), 10) - 1;
var nextMonthNums = 7 - parseInt(endOfDay.isoWeekday(), 10);

// ---------------------------------
// last month
// ---------------------------------
var lastMonth_endOfDay = moment().subtract(1, 'month').endOf("month");
var lastMonth = buildData(
		-1,
		lastMonth_endOfDay.get('date') - lastMonthNums + 1,
		lastMonth_endOfDay.get('date')
	);
data = data.concat(lastMonth);

// ---------------------------------
// this month
// ---------------------------------
var thisMonth = buildData(
		0,
		moment().startOf("month").get('date'),
		moment().endOf("month").get('date')
	);
data = data.concat(thisMonth);

// ---------------------------------
// next month
// ---------------------------------
var nextMonth = buildData(
		1,
		moment().add(1, 'month').startOf("month").get('date'),
		nextMonthNums
	);
data = data.concat(nextMonth);

function buildData(offsetMonth, start, end) {
	let arr = [];
	for (let i = start; i <= end; i++) {
		let d = moment().add(offsetMonth, 'month').set('date', i);
		let today = moment().get('date');
		arr.push({
			isToday : offsetMonth == 0 && i == today ? true : false,
			isThisMonth : offsetMonth == 0 ? true : false,
			// text : i < 10 ? '0' + i.toString() : i.toString(),
			text : i.toString(),
			date : d.format('YYYY-MM-DD'),
			weekDay : d.isoWeekday(), // 禮拜幾
			completedTime : 0,
		});
	}
	return arr;
}

export default data;
