
import React, { Component, PropTypes } from 'react';

export default class AddTodo extends Component {

	render() {

		let styles = {};

		styles.input = {
			width : '400px',
		};

		return (

			<div className='ui input left icon right labeled'>

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
