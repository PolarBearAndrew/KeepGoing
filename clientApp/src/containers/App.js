
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import _TYPES_ from '../config/TodoTypes.js';
import _LeftMenu from '../config/LeftMenu.js';

import {
	// todos
	initTodo,
	addTodo,
	completeTodo,
	undoTodo,
	removeTodo,
	// filters
	setCompletedFilter,
	setTypeFilter,
	setNeeTimeFilter,
	setDateFilter,
	resetAllFilters,
	setCurrentTodo,
	// const
	CompletedFilters,
	// editor
	updateTodoDesc,
	updateTodoNeedTime,
	updateTodoExpectAt,
	updateTodoType,
	updateTodoTitle,
} from '../actions/todo.js';

// Algoithms
import sort from '../algorithms/sort.js';

// component
import NavBar from '../components/NavBar.js';
import AddTodo from '../components/AddTodo.js';
import FilterBox from '../components/FilterBox.js';
// import Footer from '../components/Footer.js';
import TodoPanel from '../components/TodoPanel.js';

// components
import LeftMenu from '../components/LeftMenu/';
import TodoList from '../components/TodoList/';
import Calendar from '../components/Calendar/';

class App extends Component {

	constructor(props, context) {
		super(props, context);
		if(this.props.visibleTodos) {
			initTodo()(this.props.dispatch);
		}
	}

	render() {

		// 藉由 connect() 呼叫注入：
		const {
			dispatch,
			visibleTodos,
			completedFilter,
			typeFilter,
			needTimeFilter,
		} = this.props;


		let styles = {};

		styles.wrapper = {
			marginTop: '12px',
			peddingLeft : '24px',
			overflow : 'hidden',
			height : '870px',
		};

		styles.rightPanel = {
			marginLeft : '-75px',
			marginTop : '24px',
		};

		return (
			<div className='ui grid'>

				<div className='four wide column'>

					<Calendar/>

					<LeftMenu
						dateFilter={this.props.dateFilter}
						setDateFilter={ filter =>
							dispatch(setDateFilter(filter))
						}
					/>

				</div>

				<div className='eight wide column' style={styles.wrapper}>

					<NavBar />

					<AddTodo
						typeFilter={typeFilter}
						onAddClick={ todo =>
							addTodo(todo)(dispatch)
						}
					/>

					<p></p>

					<FilterBox
						typeFilter={typeFilter}
						completedFilter={completedFilter}
						needTimeFilter={needTimeFilter}
						setTypeFilter={ key =>
							dispatch(setTypeFilter(key))
						}
						setCompletedFilter={ filter =>
							dispatch(setCompletedFilter(filter))
						}
						setNeeTimeFilter={ filter =>
							dispatch(setNeeTimeFilter(filter))
						}
						resetAllFilters={ (filter) =>
							dispatch(resetAllFilters(filter))
						}
					/>

					<TodoList
						todos={visibleTodos}
						onComplete={ id =>
							completeTodo(id)(dispatch)
						}
						onUndo={ id =>
							undoTodo(id)(dispatch)
						}
						setTypeFilter={ key =>
							dispatch(setTypeFilter(key))
						}
						setCurrentTodo={ id =>
							dispatch(setCurrentTodo(id))
						}
					/>

				</div>

				<div
					style={styles.rightPanel}
					className='two wide column'
				>
					{
						this.props.currentId
							? <TodoPanel
									// todo
									todoId={this.props.currentTodo.id}
									{ ...this.props.currentTodo }
									// func
									updateTodoDesc={ (id, desc) =>
										updateTodoDesc(id, desc)(dispatch)
									}
									updateTodoNeedTime={ (id, oNeedTime, nNeedTime) =>
										updateTodoNeedTime(id, oNeedTime, nNeedTime)(dispatch)
									}
									updateTodoExpectAt={ (id, oExpectAt, nExpectAt) =>
										updateTodoExpectAt(id, oExpectAt, nExpectAt)(dispatch)
									}
									updateTodoType={ (id, oType, nType) =>
										updateTodoType(id, oType, nType)(dispatch)
									}
									updateTodoTitle={ (id, oTitle, nTitle) =>
										updateTodoTitle(id, oTitle, nTitle)(dispatch)
									}
									removeTodo={ id =>
										removeTodo(id)(dispatch)
									}
								/>
							: null
							// 這邊以後接上 statistic
					}
				</div>

			</div>
		);
	}
}


// ==========================================
// todo filter
// ==========================================
function todoCompletedFilter(todos, filter) {
	switch (filter) {
		case CompletedFilters.SHOW_ALL:
			return todos;
		case CompletedFilters.SHOW_COMPLETED:
			return todos.filter(todo => todo.completed);
		case CompletedFilters.SHOW_ACTIVE:
			return todos.filter(todo => !todo.completed);
	}
}

function todoTypeFilter(todos, filter) {
	switch (filter) {
		case 'none' :
			return todos;
		default :
			return todos.filter(todo => filter == todo.type);
	}
}

function todoNeedTimeFilter(todos, filter) {
	const _RANGE = 5;
	switch (filter) {
		case 0 :
			return todos;
		default :
			return todos.filter(todo => todo.needTime <= (filter + _RANGE));
	}
}

function dateFilter(todos, filter) {
	switch (filter) {
		case 'none' :
			return todos;
		case 'today' :
			var today = moment().add(2, 'days');
			return todos.filter(todo => moment(todo.expectAt).isBefore(today, 'day'));
		case 'thisWeek' :
			var theDay = moment().add(9, 'days');
			return todos.filter(todo => moment(todo.expectAt).isBefore(theDay, 'day'));
		default :
			return todos;
	}
}

function todoFilters(state) {
	let todoTemps;
	todoTemps = todoCompletedFilter(state.todos, state.completedFilter);
	todoTemps = todoTypeFilter(todoTemps, state.typeFilter);
	todoTemps = todoNeedTimeFilter(todoTemps, state.needTimeFilter);
	todoTemps = dateFilter(todoTemps, state.dateFilter);
	return sort(todoTemps);
}

function findCurrentTodo(state) {
	let targets = state.todos.filter( todo => {
		return todo.id == state.currentId;
	});
	if(targets.length > 0)
		return targets[0];
	else if(!state.currentId)
		return null;
	else
		return null;
}

function data(state) {
	return {
		// editor
		currentId : state.currentId,
		currentTodo : findCurrentTodo(state),
		// todo list
		visibleTodos : todoFilters(state),
		typeFilter : state.typeFilter,
		completedFilter : state.completedFilter,
		needTimeFilter : state.needTimeFilter,
		dateFilter : state.dateFilter,
	};
}

// ==========================================
// props
// ==========================================
let Todo = PropTypes.shape({
	id : PropTypes.number.isRequired,
	title : PropTypes.string.isRequired,
	completed : PropTypes.bool.isRequired,
	type : PropTypes.string.isRequired,
	needTime : PropTypes.number.isRequired,
	expectAt : PropTypes.string.isRequired,
	counter : PropTypes.number.isRequired,
	desc : PropTypes.string,
	endAt : PropTypes.string,
});

App.propTypes = {
	// todos
	visibleTodos : PropTypes.arrayOf(Todo),
	// 可見度篩選
	completedFilter : PropTypes.oneOf([
		'SHOW_ALL',
		'SHOW_COMPLETED',
		'SHOW_ACTIVE'
	]).isRequired,
	// 本日, 本週, 全部
	dateFilter : PropTypes.oneOf(
		_LeftMenu.map( o => o.key)
	).isRequired,
	// 優先權篩選器
	typeFilter: PropTypes.oneOf(
		Object.keys(_TYPES_)
	).isRequired,
};

export default connect(data)(App);
