// import { Component, PropTypes } from 'react';
import React, { Component, PropTypes } from 'react';
import { Input, Button } from 'react-bootstrap';

export default class AddTodo extends Component {
	render() {
		return (
			<div>
				<Input
					type="text"
					ref="input" // TODO: 這個有問題
					placeholder="新工作"
					buttonAfter={this.addButton()}/>
			</div>
		);
	}

	addButton(){
		return (
			<Button bsStyle='primary' onClick={e => this.handleClick(e)}>
				新增工作
			</Button>
		);
	}

	handleClick(e) {
		const node = this.refs.input;
		const text = node.value.trim();
		this.props.onAddClick(text);
		node.value = '';
	}
}

AddTodo.propTypes = {
	onAddClick: PropTypes.func.isRequired
};
