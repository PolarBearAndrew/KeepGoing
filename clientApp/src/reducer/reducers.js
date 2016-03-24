
// import lodash from 'lodash';

import { combineReducers } from 'redux';
import {
	// todo
	TODO_INIT,
	TODO_ADD,
	TODO_ADD_SUCCESS,
	TODO_ADD_FAIL,
	TODO_COMPLETE,
	TODO_REMOVE,
	// todo filter action
	FILTER_SET_COMPLETED,
	FILTER_SET_PRIORITY,
	FILTER_SET_NEETTIME,
	FILTERS_RESET,
	// todo filter types
	CompletedFilters,
} from '../actions/todo.js';

const { SHOW_ACTIVE } = CompletedFilters;
const debug = require('debug')('app:reducers.todos');


// ==========================================
// todos
// ==========================================
function todos(state = [], action) {

	switch (action.type) {

		case TODO_INIT :
			debug('TODO_INIT', action);
			return action.todos;

		case TODO_ADD :
			debug('TODO_ADD %j', action);
			return [
				{
					id : action.id,
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

		case TODO_ADD_SUCCESS :
			debug('TODO_ADD_SUCCESS %j', action);
			return state.map(todo => {
				if(todo.id == action.oldId) todo.id = action.newId;
				return todo;
			});

		case TODO_ADD_FAIL :
			debug('TODO_ADD_FAIL');
			return state;

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
	switch (action.type) {
		case FILTER_SET_COMPLETED :
			return action.filter;
		case FILTERS_RESET :
			return action.filter || SHOW_ACTIVE;
		default :
			return state;
	}
}

function priorityFilter(state = 0, action) {
	switch (action.type) {
		case FILTER_SET_PRIORITY :
			return action.filter;
		case FILTERS_RESET :
			return 0;
		default :
			return state;
	}
}

function needTimeFilter(state = null, action) {
	switch (action.type) {
		case FILTER_SET_NEETTIME :
			return action.filter;
		case FILTERS_RESET :
			return null;
		default :
			return state;
	}
}

const todoApp = combineReducers({
	completedFilter,
	priorityFilter,
	needTimeFilter,
	todos,
});

export default todoApp;
