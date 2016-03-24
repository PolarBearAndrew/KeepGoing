
require('isomorphic-fetch');
require('es6-promise').polyfill();
// import 'babel-polyfill';

var debug = require('debug')('clientApp:actions');

// ==========================================
// action types
// ==========================================
export const TODO_COMPLETE = 'TODO_COMPLETE';
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

export function initTodo() {
	
}

// ==========================================
// add todo
// ==========================================
export const TODO_ADD = 'TODO_ADD';
function todoAdd(todo) {
	return { type: TODO_ADD, ...todo };
}

export const TODO_ADD_SUCCESS = 'TODO_ADD_SUCCESS';
function todoAddSuccess(todo) {
	return { type: TODO_ADD_SUCCESS, ...todo };
}

export const TODO_ADD_FAIL = 'TODO_ADD_FAIL';
function todoAddFail(todo) {
	return { type: TODO_ADD_FAIL, ...todo };
}

export function addTodo(todo) {

	return function(dispatch) {

		dispatch(todoAdd(todo));

		fetch('http://localhost:3000/api/v1/todo/', {
			method: 'post',
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
			var ids = {
				oldId : todo.id,
				newId : res.data, // TODO: fetch fail
			};
			return dispatch(todoAddSuccess(ids));
		})
		.catch( err => {
			console.log('addTodo fail', err);
			return dispatch(todoAddFail(todo.id));
		});
	};
	//
}

// ==========================================
// complete todo
// ==========================================

export function completeTodo(id) {
	return { type: TODO_COMPLETE, id };
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
