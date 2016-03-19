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
					text: action.text,
					completed: false
				}
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
	todos,
	priorityFilter,
});

export default todoApp;
