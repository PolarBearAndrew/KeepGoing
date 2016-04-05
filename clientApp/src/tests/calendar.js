
var moment = require('moment');


var data = [];

var startOfDay = moment().startOf("month");
var endOfDay = moment().endOf("month");

var startOfDay_weekDay = startOfDay.isoWeekday();
var endOfDay_weekDay = endOfDay.isoWeekday();

var lastMonthNums = parseInt(startOfDay_weekDay, 10) - 1;
var nextMonthNums = 7 - parseInt(endOfDay_weekDay, 10);

var weekDay = ['Mon', 'Tus', 'Wed', 'Ths', 'Fri', 'Sat', 'Sun'];

// ---------------------------------
// last month
// ---------------------------------
var lastMonth_endOfDay = moment().subtract(1, 'month').endOf("month");

for (var i = lastMonth_endOfDay.get('date') - lastMonthNums + 1; i <= lastMonth_endOfDay.get('date'); i++) {
	var d = moment().subtract(1, 'month').set('date', i);
	data.push({
		text : i.toString(),
		date : d.format('YYYY-MM-DD'),
		weekDay : d.isoWeekday(), // 禮拜幾
		completedTime : 0,
	});
}

// ---------------------------------
// this month
// ---------------------------------
for (var i = 1; i <= endOfDay.get('date'); i++) {
	var d = moment().set('date', i);
	data.push({
		text : i.toString(),
		date : d.format('YYYY-MM-DD'),
		weekDay : d.isoWeekday(), // 禮拜幾
		completedTime : 0,
	});
}

// ---------------------------------
// next month
// ---------------------------------
var nextMonth_startOfDay = moment().add(1, 'month').startOf("month");

for (var i = nextMonth_startOfDay.get('date'); i <= nextMonthNums; i++) {
	var d = moment().add(1, 'month').set('date', i);
	data.push({
		text : i.toString(),
		date : d.format('YYYY-MM-DD'),
		weekDay : d.isoWeekday(), // 禮拜幾
		completedTime : 0,
	});
}

console.log('data', data);
