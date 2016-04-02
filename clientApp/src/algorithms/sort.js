
import moment from 'moment';
import _TYPES_ from '../config/Types.js';

// expectTime > priority > needTime > completed
export default (todos) => {

	todos = todos.sort( (todoA, todoB) => {

		let expectTimeA = moment(todoA.expectTime).format('YYYYMMDD');
		let expectTimeB = moment(todoB.expectTime).format('YYYYMMDD');
		// let completeA = todoA.completed ? 1 : 0;
		// let completeB = todoB.completed ? 1 : 0;

		if( expectTimeA != expectTimeB ) {
			return todoB.id - todoA.id;
		}
		else if(todoA.type != todoB.type) {
			return _TYPES_[todoB.type].priority - _TYPES_[todoA.type].priority;
		}
		else if(todoA.needTime != todoB.needTime) {
			return todoA.needTime - todoB.needTime;
		}
		// else if(completeA != completeB) {
		// 	return completeA - completeB;
		// }
		else {
			return todoA.id - todoB.id;
		}
	});

	return todos;
};
