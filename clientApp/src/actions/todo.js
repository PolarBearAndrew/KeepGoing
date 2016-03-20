
// ==========================================
// action types
// ==========================================
export const TODO_ADD = 'TODO_ADD';
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
