
import React, { Component, PropTypes } from 'react';

import { Width } from '../config/Styles';

export default class AddTodo extends Component {

	render() {

		let styles = {};

		let inputWidth = Width.MAIN_CONTENT - 117;

		styles.input = {
			width : inputWidth.toString() + 'px',
		};

		return (

			<div className='ui input left icon right labeled' >

				<i className="plus icon"></i>

				<input
					type='text'
					style={styles.input}
					placeholder=' New Jobs'
					ref={ (c) => this.newJob = c }
				/>

				<a
					className="ui blue tag label"
					onClick={e => this.handleClick(e)}>
					ADD TODO
				</a>

			</div>
		);
	}

	handleClick(e) {
		// 至少輸入 todo.title 才可建立
		if(
			! this.newJob ||
			! this.newJob.value ||
			this.newJob.value == ''
		) {
			return false;
		};
		let todo = {
			title : this.newJob.value,
			// priority : 2,
			// needTime : action.needTime || 30,
			// expectTime : moment().toString(),
		};
		this.props.onAddClick(todo);
		this.newJob.value = '';
	}

}

AddTodo.propTypes = {
	onAddClick: PropTypes.func.isRequired
};
