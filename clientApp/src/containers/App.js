import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../action/actions.js';

// components
import AddTodo from '../components/AddTodo';
import Footer from '../components/Footer';
import TodoList from '../components/TodoList';

class App extends Component {
	render() {
		// 藉由 connect() 呼叫注入：
		const { dispatch, visibleTodos, visibilityFilter } = this.props;

		let myStyle = {
			width: '400px',
			margin: '0 auto',
			marginTop: '12px',
		};
		return (
			<div style={myStyle}>

				<AddTodo
					onAddClick={ text =>
						dispatch(addTodo(text))
					}
				/>

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

function selectTodos(todos, filter) {
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
// 附註：使用 https://github.com/faassen/reselect 可以獲得更好的效能。
function select(state) {
	return {
		visibleTodos: selectTodos(state.todos, state.visibilityFilter),
		visibilityFilter: state.visibilityFilter
	};
}

// 把 component 包起來以注入 dispatch 和 state 進去
export default connect(select)(App);
