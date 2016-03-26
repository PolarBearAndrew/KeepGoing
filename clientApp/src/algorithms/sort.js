
import moment from 'moment';

// expectTime > priority > needTime > completed
export default (todos) => {

	todos = todos.sort( (todoA, todoB) => {

		let expectTimeA = moment(todoA.expectTime).format('YYYYMMDD');
		let expectTimeB = moment(todoB.expectTime).format('YYYYMMDD');
		// let completeA = todoA.completed ? 1 : 0;
		// let completeB = todoB.completed ? 1 : 0;

		if( expectTimeA != expectTimeB ) {
			return todoA.id - todoB.id;
		}
		else if(todoA.priority != todoB.priority) {
			return todoB.priority - todoA.priority;
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
