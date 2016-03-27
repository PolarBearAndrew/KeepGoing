
import React, { Component, PropTypes } from 'react';
import Todo from './TodoItem';

// export default class TodoList extends Component {
var TodoList = React.createClass({

	render : function() {

		let styles = {};

		styles.wrapper = {
			marginTop : '0px',
			height : '705px',
			'overflowX' :'visible',
			'overflowY' :'scroll',
		};

		return (
			<div id='123' className="ui container" style={styles.wrapper}>
				<p></p>
				{
					this.props.todos.map( (todo, index) =>
						<Todo
							{...todo}
							key={index}
							onComplete={ () => this.props.onComplete(todo.id) }
							onUndo={ () => this.props.onUndo(todo.id) }
							setPriorityFilter={this.props.setPriorityFilter}
						/>
					)
				}
				<p></p>
			</div>
		);
	},

	propTypes : {
		// func
		setPriorityFilter : PropTypes.func.isRequired,
		onComplete : PropTypes.func.isRequired,
		onUndo : PropTypes.func.isRequired,
		// variable
		todos : PropTypes.arrayOf(PropTypes.shape({
			id : PropTypes.number.isRequired,
			title : PropTypes.string.isRequired,
			completed : PropTypes.bool.isRequired,
			priority : PropTypes.number.isRequired,
			needTime : PropTypes.number.isRequired,
			expectAt : PropTypes.string.isRequired,
			desc : PropTypes.string,
			endAt : PropTypes.string,
		}).isRequired).isRequired
	},

});

export default TodoList;
