
import React, { Component, PropTypes } from 'react';
// import {markdown} from 'markdown';

import _PRIORITYS_ from '../config/Priority.js';

import markdown from 'marked';

markdown.setOptions({
	renderer: new markdown.Renderer(),
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: true,
	smartLists: true,
	smartypants: false
});

function semanticMarkdown(md) {
	return markdown(md)
		.replace(/<a /g, '<a target="_blank" ')
		.replace(/<ul>/, '<ul class="ui list">')
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

		let styles = {};
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

					<div dangerouslySetInnerHTML={this.buildDesc(this.props.desc)} />
					{
						// <div className="field">
						// 	<textarea rows="8">
						// 		{this.props.desc}
						// 	</textarea>
						// </div>
					}
				</div>

			</div>

		);
	},

	buildDesc(desc) {

		// var str = "# [Markdown] is a simple text-based \n\n\n [markup language]\n" +
		// 	" ******* \n\n created by [John Gruber] \n\n" +
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
		return {
			__html : semanticMarkdown(this.props.desc || ''),
		};
	},

	propTypes : {
		id : PropTypes.number,
		title : PropTypes.string,
		completed : PropTypes.bool,
		priority : PropTypes.number,
		needTime : PropTypes.number,
		expectAt : PropTypes.string,
		desc : PropTypes.string,
		endAt : PropTypes.string,
	},

});


export default TodoPanel;
