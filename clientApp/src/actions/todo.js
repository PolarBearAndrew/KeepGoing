
require('isomorphic-fetch');
require('es6-promise').polyfill();
// import 'babel-polyfill';

var debug = require('debug')('clientApp:todo.actions');

var hostName = 'http://localhost:3000';

// ==========================================
// action types
// ==========================================
export const TODO_REMOVE = 'TODO_REMOVE';

export const FILTER_SET_COMPLETED = 'FILTER_SET_COMPLETED';
export const FILTER_SET_PRIORITY = 'FILTER_SET_PRIORITY';
export const FILTER_SET_NEETTIME = 'FILTER_SET_NEETTIME';
export const FILTERS_RESET = 'FILTERS_RESET';

// ==========================================
// filter types
// ==========================================
export const CompletedFilters = {
	SHOW_ALL: 'SHOW_ALL',
	SHOW_COMPLETED: 'SHOW_COMPLETED',
	SHOW_ACTIVE: 'SHOW_ACTIVE'
};

// ==========================================
// init todo
// ==========================================
export const TODO_INIT = 'TODO_INIT';
function todoInit(todos) {
	return { type: TODO_INIT, todos };
}

export function initTodo() {
	return function(dispatch) {
		fetch(hostName + '/api/v1/todos', {
			methed : 'GET',
		})
		.then( res => res.json())
		.then( res => {
			let todos = res.data || [];
			dispatch(todoInit(todos));
		})
		.catch( err => {
			debug('init err');
		});
	};
}

// ==========================================
// add todo
// ==========================================
export const TODO_ADD = 'TODO_ADD';
function todoAdd(todo) {
	return { type: TODO_ADD, todo };
}

export const TODO_ADD_SUCCESS = 'TODO_ADD_SUCCESS';
function todoAddSuccess(info) {
	return { type: TODO_ADD_SUCCESS, ...info };
}

export const TODO_ADD_FAIL = 'TODO_ADD_FAIL';
function todoAddFail(info) {
	return { type: TODO_ADD_FAIL, ...info };
}

export function addTodo(todo) {

	todo = {
		id : todo.id,
		title : todo.title,
		desc : todo.desc || null,
		priority : todo.priority || 0,
		needTime : todo.needTime || 30,
		expectAt : moment().add(1, 'days').format('YYYY-MM-DD HH:mm'), // 預設為明天的代辦事項
		completed : false,
		endAt : null,
	};

	return function(dispatch) {

		dispatch(todoAdd(todo));

		fetch(hostName + '/api/v1/todo', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: JSON.stringify(todo),
		})
		.then( res =>  res.json() )
		.then( res => {
			if(!res.data) {
				return Promise.reject(new Error(res));
			}
			let ids = {
				oldId : todo.id,
				newId : parseInt(res.data, 10),
			};
			return dispatch(todoAddSuccess(ids));
		})
		.catch( err => {
			debug('addTodo fail', err);
			return dispatch(todoAddFail(todo.id));
		});
	};
	//
}

// ==========================================
// complete todo
// ==========================================
export const TODO_COMPLETE = 'TODO_COMPLETE';
function todoCompleted(id) {
	return { type: TODO_COMPLETE, id };
}

export const TODO_COMPLETE_SUCCESS = 'TODO_COMPLETE_SUCCESS';
function todoCompletedSuccess(id) {
	return { type: TODO_COMPLETE_SUCCESS, id };
}

export const TODO_COMPLETE_FAIL = 'TODO_COMPLETE_FAIL';
function todoCompletedFail(id) {
	return { type: TODO_COMPLETE_FAIL, id };
}

export function completeTodo(id) {
	return function(dispatch) {

		dispatch(todoCompleted(id));

		fetch(hostName + '/api/v1/todo/' + id.toString() + '/complete', {
			method : 'PUT',
		})
		.then( res => {
			todoCompletedSuccess(res.data);
		})
		.catch( err => {
			todoCompletedFail(todoCompletedFail(id));
		});
	};
}

// ==========================================
// remove todo
// ==========================================

export function removeTodo(id) {
	return { type: TODO_REMOVE, id };
}

// ==========================================
// set todo filters
// ==========================================


export function setCompletedFilter(filter) {
	return { type : FILTER_SET_COMPLETED, filter };
}

export function setPriorityFilter(filter) {
	return { type : FILTER_SET_PRIORITY, filter };
}

export function setNeeTimeFilter(filter) {
	return { type : FILTER_SET_NEETTIME, filter };
}

export function resetAllFilters(filter) {
	return { type : FILTERS_RESET, filter };
}


// ==========================================
//
// ==========================================
