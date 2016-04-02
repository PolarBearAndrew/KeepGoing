
import React, { Component, PropTypes } from 'react';
// import {markdown} from 'markdown';

import _PRIORITYS_ from '../config/Priority.js';

import markdown from 'marked';
import highlightJS from 'highlight.js';

let styles = {};

markdown.setOptions({
	renderer: new markdown.Renderer(),
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: true,
	smartLists: true,
	smartypants: false,

	// Synchronous highlighting with highlight.js
	highlight: function (code) {
		return highlightJS.highlightAuto(code).value;
	}
});

function semanticMarkdown(md) {
	return markdown(md)
		.replace(/<a /g, '<a target="_blank" ')
		.replace(/<ul>/, '<ul class="ui list">')
		.replace(/<code class="/, '<code style="width:100%;border:null;display:block;" class="ui secondary segment ')
		.replace(/<table>/g, '<table class="ui table striped">')
		.replace(/<img /g, '<img class="ui medium rounded image centered" ');
}


let TodoPanel = React.createClass({

	componentDidMount() {
		$('.counterBar').progress({
			label: 'ratio',
			text: {
				ratio: '{value}%'
			},
		});
	},

	render() {

		let priority = _PRIORITYS_[this.props.priority];

		styles.segment = {
			width : '425px',
			height : '820px',
		};

		styles.needTimeControls = {
			float : 'left',
		};

		styles.infoBlock = {
			marginTop : '-33px',
		};

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
					<i className={"icon  " +  priority.icon + ' ' + priority.color}></i>
					<div className="content">
						{this.props.title}
						<div className="sub header">{'# ' + this.props.todoId}</div>
					</div>
				</h2>

				<h4 className="ui inverted divider"></h4>

				<div
					className="ui progress green small counterBar"
					data-value="15"
					data-total="100"
				>
					<div className="bar">
						<div className="progress"></div>
					</div>
				</div>

				<div className='ui grid' style={styles.infoBlock}>

					<div className='one wide column'></div>

					<div className='ten wide column'>
						<div className="ui left icon input transparent large">
							<input type="text" defaultValue={moment(this.props.expectAt).format('YYYY-MM-DD dddd')} />
							<i className="calendar icon"></i>
						</div>
					</div>

					<div className='three wide column'>
						<div className="ui left icon input transparent large">
							<input type="number" defaultValue={this.props.needTime} />
							<i className="clock icon"></i>
						</div>
					</div>

				</div>

				<p></p>

				<div className="ui form">
					{
						this.props.editorDesc
							? this.showTextArea()
							: this.showDesc(this.props.desc)
					}
				</div>

			</div>

		);
	},

	showTextArea() {
		return (
			<div className="field">

				<textarea
					rows="12"
					style={styles.textarea}
					defaultValue={this.props.desc}
					ref={ (v) => this.newDesc = v }
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
				>
					<i className="reply icon"></i>
				</button>

			</div>
		);
	},

	showDesc(desc) {
		// var str = "# [Markdown] is a simple text-based \n\n\n [markup language]\n" +
		// 	" ******* \n\n created by [John Gruber] \n\n" +
		// 	"```js \n\n" +
		// 	"console.log('test'); \n\n" +
		// 	"``` \n\n" +
		// 	" name | desc \n" +
		// 	" ---- | ---- \n" +
		// 	" abc | okok \n" +
		// 	"[John Gruber](http://daringfireball.net) \n\n" +
		// 	" * item 1 \n" +
		// 	" * item 2 \n" +
		// 	" * item 3 \n" +
		// 	"     * item 3.1 \n" +
		// 	"     * item 3.2 \n" +
		// 	"     * item 3.3 \n" +
		// 	" * item 1 \n" +
		// 	" * item 2 \n" +
		// 	" * item 3 \n" +
		// 	"![熊熊好可愛](https://d26hyti2oua2hb.cloudfront.net/600/arts/201602142333-q8MQ2.jpg)";
		//
		var html = {
			__html : semanticMarkdown(desc || '點擊輸入備註...'),
		};
		return (
			<div
				dangerouslySetInnerHTML={html}
				onDoubleClick={ e => this.props.setEditTodoDesc(true) }
			/>
		);
	},

	handleSaveTodoDesc(e) {
		this.props.updateTodoDesc(this.props.id, this.newDesc.value);
	},

	propTypes : {
		id : PropTypes.number.isRequired,
		title : PropTypes.string.isRequired,
		completed : PropTypes.bool.isRequired,
		priority : PropTypes.number.isRequired,
		needTime : PropTypes.number.isRequired,
		expectAt : PropTypes.string.isRequired,
		desc : PropTypes.string,
		endAt : PropTypes.string,
	},

});


export default TodoPanel;
