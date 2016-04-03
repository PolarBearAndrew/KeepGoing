
import React, { Component, PropTypes } from 'react';
import { markdown } from '../libs/';
import _TYPES_ from '../config/TodoTypes.js';
let debug = require('debug')('app:TodoPanel');

let styles = {};

let TodoPanel = React.createClass({

	getInitialState() {
		return {
			id : this.props.todoId,
			desc : this.props.desc,
			needTime : this.props.needTime,
		};
	},

	componentWillReceiveProps(nextProps) {
		if(this.state.id != nextProps.todoId) {
			return this.setState({
				id : nextProps.todoId,
				desc : nextProps.desc,
				needTime : nextProps.needTime,
			});
		}
	},

	componentDidMount() {
		$('.counterBar').progress({
			label : 'ratio',
			value : this.props.counter,
			total : 100,
			text : {
				ratio : '{value}%'
			},
		});
	},

	componentDidUpdate() {
		// reset progress bar
		$('.counterBar').progress({
			label : 'ratio',
			value : this.props.counter,
			total : 100,
			text : {
				ratio : '{value}%'
			},
		});
	},

	render() {

		let type = _TYPES_[this.props.type];

		styles.segment = {
			width : '425px',
			height : '820px',
			overflowX :'visible',
			overflowY :'scroll',
		};

		styles.needTimeControls = {
			float : 'left',
		};

		if(this.props.type == 'daily')
			styles.infoBlock = { marginTop : '-33px', };
		else
			styles.infoBlock = { marginTop : '-7px', };

		styles.btnFloatRight = {
			float : 'right',
		};

		styles.textarea = {
			marginBottom : '4px',
		};

		return (
			<div
				style={styles.segment}
				className="ui stacked segment"
			>

				<h2 className="ui header">
					<i className={"icon  " +  type.icon + ' ' + type.color}></i>
					<div className="content">
						{this.props.title}
						<div className="sub header">{'# ' + this.props.todoId}</div>
					</div>
				</h2>

				<h4 className="ui inverted divider"></h4>

				{
					this.props.type == 'daily'
					? <div className="ui progress green small counterBar">
							<div className="bar">
								<div className="progress"></div>
							</div>
						</div>
					: null
				}

				<div className='ui grid' style={styles.infoBlock}>

					<div className='one wide column'></div>

					<div className='ten wide column'>
						<div className="ui left icon input transparent large">
							<input type="text" defaultValue={moment(this.props.expectAt).format('YYYY-MM-DD dddd')} />
							<i className="calendar icon"></i>
						</div>
					</div>

					<div className='three wide column'>
						<div className="ui left icon input transparent large" >
							<input
								type="number"
								onKeyDown={this.handleKeyDown}
								value={this.state.needTime}
								onChange={ e =>
									this.handleChange('needTime', e.target.value)
								}
							/>
							<i className="clock icon"></i>
						</div>
					</div>

				</div>

				<p></p>

				<div className="ui form">
					{
						this.props.editorDesc
							? this.showTextArea(this.props.desc)
							: this.showDesc(this.props.desc)
					}
				</div>

			</div>

		);
	},

	handleChange(key, value) {
		let obj = {};
		obj[key] = value;
		return this.setState(obj);
	},

	showTextArea(desc) {
		return (
			<div className="field">

				<textarea
					rows="12"
					style={styles.textarea}
					value={this.state.desc || ''}
					onChange={ e =>
						this.handleChange('desc', e.target.value)
					}
				>
				</textarea>

				<button
					className="ui circular icon button blue"
					style={styles.btnFloatRight}
					onClick={ e => this.handleSaveTodoDesc(e) }
				>
					<i className="save icon"></i>
				</button>
				<button
					className="ui circular icon button gray"
					style={styles.btnFloatRight}
					onClick={ e => this.props.setEditTodoDesc(false) }
				>
					<i className="reply icon"></i>
				</button>

			</div>
		);
	},

	showDesc(desc) {
		if(desc) {
			let html = { __html : markdown(desc || ''), };
			return (
				<div
					dangerouslySetInnerHTML={html}
					onDoubleClick={ e => this.props.setEditTodoDesc(true) }
				>
				</div>
			);
		}
		else {
			let style = {
				width : '100%',
				height : '200px',
				backgroundColor : 'rgb(255, 251, 239)',
				borderRadius : '4px',
			};
			return (
				<div
					style={style}
					onDoubleClick={ e => this.props.setEditTodoDesc(true) }
				>
					{this.defaultArea() }
				</div>
			);
		}
	},

	defaultArea() {
		let style = { marginTop : '89px' };
		return (
			<center>
				<i className="file text outline icon small grey"></i>
				<h2 className="ui icon header" style={style}>
						<div className="content">
							<div className="sub header">寫下更多備註 ...</div>
						</div>
				</h2>
			</center>
		);
	},

	handleSaveTodoDesc(e) {
		this.props.updateTodoDesc(this.props.id, this.state.desc.trim());
	},

	handleKeyDown(e) {
		// let t = parseInt(this.needTime.value, 10);
		let t = parseInt(this.state.needTime, 10);
		if(e.keyCode == 38) {  // up
			this.setState({ needTime : t + 4});
			// this.needTime.value = t + 4;
		}
		else if(e.keyCode == 40) { // down
			this.setState({ needTime : t - 4});
			// this.needTime.value = t - 4;
		}
		else if(e.keyCode == 13) { // enter
			this.props.updateTodoNeedTime(this.props.id, this.props.needTime, t);
		}
	},

	propTypes : {
		id : PropTypes.number.isRequired,
		title : PropTypes.string.isRequired,
		completed : PropTypes.bool.isRequired,
		type : PropTypes.string.isRequired,
		needTime : PropTypes.number.isRequired,
		expectAt : PropTypes.string.isRequired,
		counter : PropTypes.number.isRequired,
		desc : PropTypes.string,
		endAt : PropTypes.string,
	},

});

export default TodoPanel;
