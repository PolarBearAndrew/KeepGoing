
import React, { Component, PropTypes } from 'react';
import { markdown } from '../libs/';
import _TYPES_ from '../config/TodoTypes.js';
import DatePicker from './Calendar/DatePicker.js';

let debug = require('debug')('app:TodoPanel');

let styles = {};
let types = [];

Object.keys(_TYPES_).forEach( key => {
	types.push({
		..._TYPES_[key],
		key
	});
});
types = types.sort( (tA, tB) => {
	return tA.priority - tB.priority;
});

let TodoPanel = React.createClass({

	getInitialState() {
		return {
			id : this.props.todoId,
			title : this.props.title,
			desc : this.props.desc,
			needTime : this.props.needTime,
			onEnditDesc : false,
			onEditTitle : false,
		};
	},

	componentWillReceiveProps(nextProps) {
		if(this.state.id != nextProps.todoId) {
			return this.setState({
				id : nextProps.todoId,
				title : nextProps.title,
				desc : nextProps.desc,
				needTime : nextProps.needTime,
				onEnditDesc : false,
				onEditTitle : false,
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
		$('#typeIcon').popup({
			popup: '#typePopout',
			inline : true,
			hoverable : true,
			position : 'bottom left',
			delay : {
				show : 200,
				hide : 800,
			}
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

		styles.typeIcons = {
			cursor : 'pointer',
		};

		styles.editTitle = {
			height : '40px',
			width : '240px',
		};

		styles.editTitleCheck = {
			cursor : 'pointer',
		};

		return (
			<div
				style={styles.segment}
				className="ui stacked segment"
			>


				<h2 className="ui header">

					<i id='typeIcon' className={"icon  " +  type.icon + ' ' + type.color}></i>

					<div
						className="content"
						onDoubleClick={ e =>
							this.setState({onEditTitle : true})
						}
					>
						{
							this.state.onEditTitle
								? this.editTitle()
								: this.props.title
						}
						<div className="sub header">{'# ' + this.props.todoId}</div>
					</div>

				</h2>

				<div id='typePopout' className="ui flowing popup transition hidden">
					{
						types.map( t =>
							<i
								key={t.priority}
								style={styles.typeIcons}
								onClick={ e =>
									this.props.updateTodoType(this.props.todoId, this.props.type, t.key)
								}
								className={'typeIcons circular icon ' + t.color + ' ' + t.icon}>
							</i>
						)
					}
				</div>


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
						<DatePicker
							value={this.props.expectAt}
							onUpdate={this.props.updateTodoExpectAt.bind(null, this.props.todoId)}
						/>
					</div>

					<div className='three wide column'>
						<div className="ui left icon input transparent large" >
							<input
								type="number"
								onKeyDown={this.handleNeedTimeKeyDown}
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
						this.state.onEnditDesc
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
					onClick={ e => {
						this.handleSaveTodoDesc(e);
						this.setState({onEnditDesc : false});
					}}
				>
					<i className="save icon"></i>
				</button>
				<button
					className="ui circular icon button gray"
					style={styles.btnFloatRight}
					onClick={ e => this.setState({onEnditDesc : false}) }
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
					onDoubleClick={ e => this.setState({onEnditDesc : true}) }
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
					onDoubleClick={ e => this.setState({onEnditDesc : true}) }
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

	handleNeedTimeKeyDown(e) {
		let t = parseInt(this.state.needTime, 10);
		if(e.keyCode == 38) {  // up
			this.setState({ needTime : t + 4});
		}
		else if(e.keyCode == 40) { // down
			this.setState({ needTime : t - 4});
		}
		else if(e.keyCode == 13) { // enter
			this.props.updateTodoNeedTime(this.props.id, this.props.needTime, t);
		}
	},

	editTitle() {
		return (
			<div className="ui small icon input" style={styles.editTitle}>
				<input
					type="text"
					value={this.state.title}
					onKeyDown={this.handleTitleKeyDown}
					onChange={ e =>
						this.handleChange('title', e.target.value)
					}
				/>
				<i
					style={styles.editTitleCheck}
					className="edit icon black">
				</i>
			</div>
		);
	},

	handleTitleKeyDown(e) {
		if(e.keyCode == 13) { // enter
			this.setState({onEditTitle: false});
			this.props.updateTodoTitle(this.props.todoId, this.props.title, this.state.title);
		}
	},

	// 一堆 func 要補

	propTypes : {
		id : PropTypes.number.isRequired,
		todoId : PropTypes.number.isRequired,
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
