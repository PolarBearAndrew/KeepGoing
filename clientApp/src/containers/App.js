
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../action/actions.js';

// components
import NavBar from '../components/NavBar.js';
import LeftMenu from '../components/LeftMenu.js';
import AddTodo from '../components/AddTodo.js';
import TodoList from '../components/TodoList/';
import Footer from '../components/Footer';

class App extends Component {

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
					<LeftMenu />
				</div>

				<div className='seven wide column' style={styles.wrapper}>

					<NavBar />

					<AddTodo
						onAddClick={ text =>
							dispatch(addTodo(text))
						}
					/>

					<br/>
					<br/>

					<TodoList
						todos={visibleTodos}
						onTodoClick={ index =>
							dispatch(completeTodo(index))
						}
					/>

					{
					// <Footer
					// 	filter={visibilityFilter}
					// 	onFilterChange={ nextFilter =>
					// 		dispatch(setVisibilityFilter(nextFilter))
					// 	}
					// />
					}

				</div>

			</div>
		);
	}
}

App.propTypes = {

	visibleTodos: PropTypes.arrayOf(PropTypes.shape({
		// 這邊需要重新寫
		text: PropTypes.string.isRequired,
		completed: PropTypes.bool.isRequired
	})),
	visibilityFilter: PropTypes.oneOf([
		'SHOW_ALL',
		'SHOW_COMPLETED',
		'SHOW_ACTIVE'
	]).isRequired,
};

function todoFilter(todos, filter) {
	switch (filter) { // eslint 的 switch 縮排也太奇怪了...
		case VisibilityFilters.SHOW_ALL:
			return todos;
		case VisibilityFilters.SHOW_COMPLETED:
			return todos.filter(todo => todo.completed);
		case VisibilityFilters.SHOW_ACTIVE:
			return todos.filter(todo => !todo.completed);
	}
}

// 我們想要從給定的全域 state 注入哪些 props？
function select(state) {
	return {
		visibleTodos: todoFilter(state.todos, state.visibilityFilter),
		visibilityFilter: state.visibilityFilter
	};
}

// 把 component 包起來以注入 dispatch 和 state 進去
export default connect(select)(App);
