
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


import {
	// todos
	initTodo,
	addTodo,
	completeTodo,
	undoTodo,
	// filters
	setCompletedFilter,
	setPriorityFilter,
	setNeeTimeFilter,
	resetAllFilters,
	setCurrentTodo,
	// const
	CompletedFilters,
	// editor
	setEditTodoDesc,
	updateTodoDesc,
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

class App extends Component {

	constructor(props, context) {
		super(props, context);
		var menuList = [
			{
				id : 1,
				text : 'Today\'s Jobs',
				active : true,
			},
			{
				id : 2,
				text : 'Weekly Jobs',
			},
			{
				id : 3,
				text : 'All Jobs',
			},
		];
		if(this.props.visibleTodos) {
			initTodo()(this.props.dispatch);
		}
		this.state = {menuList};
	}

	render() {

		// 藉由 connect() 呼叫注入：
		const {
			dispatch,
			visibleTodos,
			completedFilter,
			priorityFilter,
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
					<LeftMenu
						menuList={this.state.menuList}
					/>
				</div>

				<div className='eight wide column' style={styles.wrapper}>

					<NavBar />

					<AddTodo
						priorityFilter={priorityFilter}
						onAddClick={ todo =>
							addTodo(todo)(dispatch)
						}
					/>

					<p></p>

					<FilterBox
						priorityFilter={priorityFilter}
						completedFilter={completedFilter}
						needTimeFilter={needTimeFilter}
						setPriorityFilter={ index =>
							dispatch(setPriorityFilter(index))
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
						setPriorityFilter={ index =>
							dispatch(setPriorityFilter(index))
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
									setEditTodoDesc={ bool =>
										dispatch(setEditTodoDesc(bool))
									}
									updateTodoDesc={ (id, desc) =>
										updateTodoDesc(id, desc)(dispatch)
									}
									// editor attr
									editorDesc={this.props.editorDesc || false}
								/>
							: null
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

function todoPriorityFilter(todos, filter) {
	switch (filter) {
		case 1 :
			return todos;
		default :
			return todos.filter(todo => filter == todo.priority);
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

function todoFilters(state) {
	let todoTemps;
	todoTemps = todoCompletedFilter(state.todos, state.completedFilter);
	todoTemps = todoPriorityFilter(todoTemps, state.priorityFilter);
	todoTemps = todoNeedTimeFilter(todoTemps, state.needTimeFilter);
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
		editorDesc : state.editorDesc,
		// todo list
		visibleTodos : todoFilters(state),
		completedFilter : state.completedFilter,
		priorityFilter : state.priorityFilter,
		needTimeFilter : state.needTimeFilter,
	};
}

// ==========================================
// props
// ==========================================

let Todo = PropTypes.shape({
	id : PropTypes.number.isRequired,
	title : PropTypes.string.isRequired,
	completed : PropTypes.bool.isRequired,
	priority : PropTypes.number.isRequired,
	needTime : PropTypes.number.isRequired,
	expectAt : PropTypes.string.isRequired,
	desc : PropTypes.string,
	endAt : PropTypes.string,
});

App.propTypes = {
	// todos
	visibleTodos: PropTypes.arrayOf(Todo),
	// 可見度篩選
	completedFilter: PropTypes.oneOf([
		'SHOW_ALL',
		'SHOW_COMPLETED',
		'SHOW_ACTIVE'
	]).isRequired,
	// 優先權篩選器
	priorityFilter: PropTypes.oneOf([
		0, 1, 2, 3, 4,
	]).isRequired,
};

export default connect(data)(App);
