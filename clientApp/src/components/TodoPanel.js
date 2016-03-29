
import React, { Component, PropTypes } from 'react';
import {markdown} from 'markdown';

import _PRIORITYS_ from '../config/Priority.js';


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
					<div className="field">
						<textarea rows="8">
							{this.props.desc}
						</textarea>
					</div>
				</div>

			</div>

		);
	},

	buildDesc(desc) {
		return {
			__html : markdown.toHTML(`*************************

#### 基本功能

* 新增代辦項目
	* 新增時選擇篩選優先權, 可以直接新增該優先權的工作項目
	* 新增時預設為明天的工作 // todo
	* 新增時預設該工作項目所需時間為 30 min // todo
	* 新增時預設敘述為 null // todo
`)
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
