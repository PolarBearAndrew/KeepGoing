
// ==========================================
// action types
// ==========================================
export const TODO_ADD = 'TODO_ADD';
export const TODO_COMPLETE = 'TODO_COMPLETE';
export const TODO_REMOVE = 'TODO_REMOVE';
export const FILTER_SET_VISIBILITY = 'FILTER_SET_VISIBILITY';
export const FILTER_SET_PRIORITY = 'FILTER_SET_PRIORITY';

// ==========================================
// filter types
// ==========================================
export const VisibilityFilters = {
	SHOW_ALL: 'SHOW_ALL',
	SHOW_COMPLETED: 'SHOW_COMPLETED',
	SHOW_ACTIVE: 'SHOW_ACTIVE'
};

// ==========================================
// actions
// ==========================================

export function addTodo(todo) {
	return { type: TODO_ADD, ...todo };
}

export function completeTodo(id) {
	return { type: TODO_COMPLETE, id };
}

export function removeTodo(id) {
	return { type: TODO_REMOVE, id };
}

export function setVisibilityFilter(filter) {
	return { type: FILTER_SET_VISIBILITY, filter };
}

// ==========================================
// 
// ==========================================
