
import React, { Component, PropTypes } from 'react';

export default class AddTodo extends Component {

	render() {
		return (
			<div>
				<input
					type='text'
					placeholder=' Add new job'
					ref={ (c) => this.newJob = c }
				/>
				<button onClick={e => this.handleClick(e)}>
					ADD TODO
				</button>
			</div>
		);
	}

	handleClick(e) {

		if(
			! this.newJob ||
			! this.newJob.value ||
			this.newJob.value == ''
		) {
			return ;
		};
		let text = this.newJob.value;
		this.props.onAddClick(text);
		this.newJob.value = '';
	}
}

AddTodo.propTypes = {
	onAddClick: PropTypes.func.isRequired
};
