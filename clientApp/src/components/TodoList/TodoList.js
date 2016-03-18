
import React, { Component, PropTypes } from 'react';
import Todo from './TodoItem';

export default class TodoList extends Component {

	render() {

		let styles = {};

		styles.wrapper = {
			marginTop : '20px',
		};

		return (
			<div className="ui container" style={styles.warpper}>
				{
					this.props.todos.map( (todo, index) => 
						<Todo
							{...todo}
							key={index}
							onClick={ () => this.props.onTodoClick(index) }
						/>
					)
				}
			</div>
		);

	}
}

TodoList.propTypes = {
	onTodoClick: PropTypes.func.isRequired,
	todos: PropTypes.arrayOf(PropTypes.shape({
		text: PropTypes.string.isRequired,
		completed: PropTypes.bool.isRequired
	}).isRequired).isRequired
};
