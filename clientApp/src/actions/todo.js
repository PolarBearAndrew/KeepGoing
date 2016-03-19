
// action types
export const TODO_ADD = 'TODO_ADD';
export const TODO_COMPLETE = 'TODO_COMPLETE';
export const FILTER_SET_VISIBILITY = 'FILTER_SET_VISIBILITY';
export const FILTER_SET_PRIORITY = 'FILTER_SET_PRIORITY';


export const VisibilityFilters = {
	SHOW_ALL: 'SHOW_ALL',
	SHOW_COMPLETED: 'SHOW_COMPLETED',
	SHOW_ACTIVE: 'SHOW_ACTIVE'
};

// actions
export function add(text) {
	return { type: TODO_ADD, text };
}

export function complete(index) {
	return { type: TODO_COMPLETE, index };
}

export function setVisibilityFilter(filter) {
	return { type: FILTER_SET_VISIBILITY, filter };
}
