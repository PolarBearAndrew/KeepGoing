
import React, { Component, PropTypes } from 'react';
import Todo from './TodoItem';

// export default class TodoList extends Component {
var TodoList = React.createClass({

	// getDefaultProps : function() {
	//
	// 	return {todos};
	// },

	render : function() {

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
	},

	propTypes : {
		onTodoClick : PropTypes.func.isRequired,
		todos : PropTypes.arrayOf(PropTypes.shape({
			// required
			id : PropTypes.number.isRequired,
			title : PropTypes.string.isRequired,
			completed : PropTypes.bool.isRequired,
			priority : PropTypes.number.isRequired,
			// not required
			desc : PropTypes.string,
			endAt : PropTypes.string,
			needTime : PropTypes.number,
			expectTime : PropTypes.string,
		}).isRequired).isRequired
	},

});

export default TodoList;
//
