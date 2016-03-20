
import { combineReducers } from 'redux';
import {
	// todo action
	TODO_ADD,
	TODO_COMPLETE,
	TODO_REMOVE,
	// todo filter action
	FILTER_SET_VISIBILITY,
	FILTER_SET_PRIORITY,
	// todo filter types
	VisibilityFilters
} from '../actions/todo.js';

const { SHOW_ALL } = VisibilityFilters;
const debug = require('debug')('app:reducers');

function visibilityFilter(state = SHOW_ALL, action) {
	switch (action.type) {
		case FILTER_SET_VISIBILITY :
			return action.visibilityFilter;
		default :
			return state;
	}
}

function priorityFilter(state = 0, action) {
	switch (action.type) {
		case FILTER_SET_PRIORITY :
			return action.priorityFilter;
		default :
			return state;
	}
}

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
			return state.filter( todo => todo.id != action.id);

		case TODO_REMOVE :
			debug('TODO_REMOVE %j', action);
			return state.filter( todo => todo.id != action.id);

		default :
			return state;
	}
}

const todoApp = combineReducers({
	visibilityFilter,
	priorityFilter,
	todos,
});

export default todoApp;
