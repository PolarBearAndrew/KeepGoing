
import React, { Component, PropTypes } from 'react';

export default class AddTodo extends Component {

	render() {

		return (

			<div className='ui left icon input right labeled'>

				<i className="plus icon"></i>

				<input
					type='text'
					placeholder=' New Jobs'
					ref={ (c) => this.newJob = c }
				/>

				<a
					className="ui blue tag label"
					onClick={e => this.handleClick(e)}
				>
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
