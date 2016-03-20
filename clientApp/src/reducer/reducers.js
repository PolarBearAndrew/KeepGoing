
import { combineReducers } from 'redux';
import {
	// todo action
	TODO_ADD,
	TODO_COMPLETE,
	TODO_REMOVE,
	// todo filter action
	FILTER_SET_COMPLETED,
	FILTER_SET_PRIORITY,
	// todo filter types
	CompletedFilters,
} from '../actions/todo.js';

const { SHOW_ACTIVE } = CompletedFilters;
const debug = require('debug')('app:reducers');


// ==========================================
// todos
// ==========================================
function todos(state = [], action) {
	switch (action.type) {

		case TODO_ADD :
			debug('TODO_ADD %j', action);
			return [
				{
					id : action.id || Math.ceil(Math.random() * 10000),
					title : action.title,
					desc : action.desc || null,
					priority : action.priority || 0,
					needTime : action.needTime || 30,
					expectTime : moment().add(1, 'days').format('YYYY-MM-DD'), // 預設為明天的代辦事項
					endAt : null,
					completed : false,
				},
				...state,
			];

		case TODO_COMPLETE :
			debug('TODO_COMPLETE %j', action);
			return state.map( todo => {
				if(todo.id == action.id) todo.completed = true;
				return todo;
			});

		case TODO_REMOVE :
			debug('TODO_REMOVE %j', action);
			return state.filter( todo => todo.id != action.id);

		default :
			return state;
	}
}

// ==========================================
// filters
// ==========================================
function completedFilter(state = SHOW_ACTIVE, action) {
	debug('completedFilter %j', action);
	switch (action.type) {
		case FILTER_SET_COMPLETED :
			return action.filter;
		default :
			return state;
	}
}

function priorityFilter(state = 0, action) {
	debug('priorityFilter %j', action);
	switch (action.type) {
		case FILTER_SET_PRIORITY :
			return action.filter;
		default :
			return state;
	}
}

const todoApp = combineReducers({
	completedFilter,
	priorityFilter,
	todos,
});

export default todoApp;
