
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { FILTER_SET_VISIBILITY, VisibilityFilters } from '../actions/todo.js';
// import { addTodo, completeTodo } from '../action/actions.js';
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions/todo.js';

// component
import NavBar from '../components/NavBar.js';
import AddTodo from '../components/AddTodo.js';
import Footer from '../components/Footer';

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
		var date = '2016/3/3';
		var todos = [
			{
				id : 1,
				title : '記得補念過去幾天的英文',
				desc : '備註備註備註備註備註備註備註備註備註備註備註備註備註備註備註備註',
				priority : 1,
				needTime : 90,
				expectTime : date,
				endAt : date,
				completed : false,
			},
			{
				id : 2,
				title : '跟蔡政欽去饒河街夜市',
				desc : '備註備註備註備註備註備註備註備註備註備註備註備註備註備註備註備註',
				priority : 2,
				needTime : 30,
				expectTime : date,
				endAt : date,
				completed : false,
			},
			{
				id : 3,
				title : '把 fdrShop 當時多的 issue 刪掉',
				desc : '備註備註備註備註備註備註備註備註備註備註備註備註備註備註備註備註',
				priority : 3,
				needTime : 55,
				expectTime : date,
				endAt : date,
				completed : false,
			},
			{
				id : 2,
				title : '完成todolist',
				desc : '備註備註備註備註備註備註備註備註備註備註備註備註備註備註備註備註',
				priority : 0,
				needTime : 400,
				expectTime : date,
				endAt : date,
				completed : false,
			},
		];
		this.state = {menuList, todos};
	}

	render() {

		// 藉由 connect() 呼叫注入：
		const { dispatch, visibleTodos, visibilityFilter } = this.props;

		let styles = {};

		styles.wrapper = {
			marginTop: '12px',
			peddingLeft : '24px',
		};

		return (
			<div className='ui grid'>

				<div className='four wide column'>
					<LeftMenu
						menuList={this.state.menuList}
					/>
				</div>

				<div className='seven wide column' style={styles.wrapper}>

					<NavBar />

					<AddTodo
						onAddClick={ text =>
							dispatch(todo.add(text))
						}
					/>

					<br/>
					<br/>

					<TodoList
						todos={this.state.todos}
						onTodoClick={ index =>
							dispatch(todos.completeTodo(index))
						}
					/>

					{
					// <Footer
					// 	filter={visibilityFilter}
					// 	onFilterChange={ nextFilter =>
					// 		dispatch(todos.setVisibilityFilter(nextFilter))
					// 	}
					// />
					}

				</div>

			</div>
		);
	}
}

App.propTypes = {
	// todos
	visibleTodos: PropTypes.arrayOf(PropTypes.shape({
		id : PropTypes.number.isRequired,
		title : PropTypes.string.isRequired,
		completed : PropTypes.bool.isRequired,
		priority : PropTypes.number.isRequired,
		desc : PropTypes.string,
		endAt : PropTypes.string,
		needTime : PropTypes.number,
		expectTime : PropTypes.string,
	})),
	// 可見度篩選
	visibilityFilter: PropTypes.oneOf([
		'SHOW_ALL',
		'SHOW_COMPLETED',
		'SHOW_ACTIVE'
	]).isRequired,
	// 優先權篩選器
	priorityFilter: PropTypes.oneOf([
		0, 1, 2, 3, 4,
	]).isRequired,
};

function todoVisibilityFilter(todos, filter) {
	switch (filter) {
		case VisibilityFilters.SHOW_ALL:
			return todos;
		case VisibilityFilters.SHOW_COMPLETED:
			return todos.filter(todo => todo.completed);
		case VisibilityFilters.SHOW_ACTIVE:
			return todos.filter(todo => !todo.completed);
	}
}

function todoPriorityFilter(todos, filter) {
	if(!filter || filter == 0)
		return todos;
	else
		return todos.filter(todo => filter == todo.priority);
}

function data(state) {
	let todoTemps = todoVisibilityFilter(state.todos, state.visibilityFilter);
	return {
		visibleTodos : todoPriorityFilter(todoTemps, state.priorityFilter),
		visibilityFilter : state.visibilityFilter,
		priorityFilter : state.priorityFilter,
	};
}

export default connect(data)(App);
