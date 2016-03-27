
// import lodash from 'lodash';

import { combineReducers } from 'redux';
import {
	// todo
	TODO_INIT,
	TODO_ADD,
	TODO_ADD_SUCCESS,
	TODO_ADD_FAIL,
	TODO_COMPLETE,
	TODO_COMPLETE_SUCCESS,
	TODO_COMPLETE_FAIL,
	TODO_UNDO,
	TODO_UNDO_SUCCESS,
	TODO_UNDO_FAIL,
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

	debug('type %s, action', action.type, action);

	switch (action.type) {

		// ==========================================
		// init todo
		// ==========================================
		case TODO_INIT :
			return action.todos;

		// ==========================================
		// add todo
		// ==========================================
		case TODO_ADD : //  不能在這邊寫預設值, 會沒有寫進資料庫
			return [
				action.todo,
				...state,
			];

		case TODO_ADD_SUCCESS :
			return state.map(todo => {
				if(todo.id == action.oldId) todo.id = action.newId;
				return todo;
			});

		case TODO_ADD_FAIL : // 這逼要怎麼做處理
			return state.filter(todo => {
				return todo.id != action.id;
			});

		// ==========================================
		// complete todo
		// ==========================================
		case TODO_COMPLETE :
			return state.map( todo => {
				if(todo.id == action.id) todo.completed = true;
				return todo;
			});

		case TODO_COMPLETE_SUCCESS :
			return state;

		case TODO_COMPLETE_FAIL :
			return state.map( todo => {
				if(todo.id == action.id) todo.completed = false;
				return todo;
			});

		// ==========================================
		// undo todo
		// ==========================================
		case TODO_UNDO :
			return state.map( todo => {
				if(todo.id == action.id) todo.completed = false;
				return todo;
			});

		case TODO_UNDO_SUCCESS :
			return state;

		case TODO_UNDO_FAIL :
			return state.map( todo => {
				if(todo.id == action.id) todo.completed = true;
				return todo;
			});

		// ==========================================
		// remove todo
		// ==========================================
		case TODO_REMOVE :
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

// index 1 = 無狀態
function priorityFilter(state = 1, action) {
	switch (action.type) {
		case FILTER_SET_PRIORITY :
			return action.filter;
		case FILTERS_RESET :
			return 1;
		default :
			return state;
	}
}

function needTimeFilter(state = 0, action) {
	switch (action.type) {
		case FILTER_SET_NEETTIME :
			return action.filter;
		case FILTERS_RESET :
			return 0;
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
