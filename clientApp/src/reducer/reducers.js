
import moment from 'moment';
import { combineReducers } from 'redux';

import {
	TODO_ADD,
	TODO_COMPLETE,
	FILTER_SET_VISIBILITY,
	FILTER_SET_PRIORITY,
	VisibilityFilters
} from '../actions/todo.js';

const { SHOW_ALL } = VisibilityFilters;

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
			return [
				...state,
				{
					id : action.id || 123,
					title : action.title,
					desc : action.desc || null,
					priority : action.priority || 2,
					needTime : action.needTime || 30,
					expectTime : moment().add(1, 'days').format('YYYY-MM-DD'), // 預設為明天的代辦事項
					endAt : null,
					completed : false,
				},
			];
		case TODO_COMPLETE :
			return [
				...state.slice(0, action.index),
				Object.assign({}, state[action.index], {
					completed : true
				}),
				...state.slice(action.index + 1)
			];
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
