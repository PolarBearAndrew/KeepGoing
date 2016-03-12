
import React, { Component, PropTypes } from 'react';

export default class AddTodo extends Component {

	render() {
		return (
			<div>
				<input
					type='text'
					placeholder='新工作'
					ref={ (c) => this.newJob = c }
				/>
				<button onClick={e => this.handleClick(e)}>
					新增工作
				</button>
			</div>
		);
	}

	handleClick(e) {
		console.log('newJobText', );
		let text = this.newJob.value;
		this.props.onAddClick(text);
		this.newJob.value = '';
	}
}

AddTodo.propTypes = {
	onAddClick: PropTypes.func.isRequired
};
