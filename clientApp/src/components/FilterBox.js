
import React, { Component, PropTypes } from 'react';

import Prioritys from '../config/Priority.js';


let FilterBox = React.createClass({

	getInitialState() {
		// Prioritys = Prioritys.reverse();
		return {
			value: null,
		};
	},

	componentDidMount() {
		$('.ui.dropdown').dropdown({
			action: 'hide', // 不會自動顯示 dropdown 選取了什麼, 自動顯示的話會造成 react-id 重複
		});
	},

	render() {

		let styles = {};

		styles.wrapper = {
			marginTop : '10px',
			marginBottom : '100px',
		};

		styles.inputNeedTime = {
			width : '100px',
		};

		styles.colorBall = {
			marginLeft : '-10px',
		};

		const priority = Prioritys[this.props.priorityFilter] ||
			{ color : 'black', text : 'Priority Filter' };

		return (
			<div className="ui grid" style={styles.warpper}>

				<div className='one wide column'></div>

				<div className='six wide column'>
					<div className="ui buttons mini">
						<button className="ui button" >全部</button>
						<button className="ui button" >已完成</button>
						<button className="ui button olive" >未完成</button>
					</div>
				</div>

				<div className='five wide column'>
					<div className="ui floating dropdown labeled icon button">
						<i className="filter icon"></i>
						<span className='text' style={styles.colorBall}>
							<div className={'ui empty circular label ' + priority.color}></div>
							{priority.text}
						</span>
						<div className="menu">
							<div className="ui icon search input">
								<i className="search icon"></i>
								<input type="text" placeholder="Search tags..."/>
							</div>
							<div className="divider"></div>
							<div className="header">
								<i className="tags icon"></i>
								Priority
							</div>
							<div className="scrolling menu">
								{this.buildPriorityItems(Prioritys)}
							</div>
						</div>
					</div>
				</div>

				<div className='four wide column'>
					<div className="ui left icon input mini" style={styles.inputNeedTime}>
						<input type="text" placeholder="min..."/>
						<i className="clock icon"></i>
					</div>
				</div>

			</div>
		);
	},

	buildPriorityItems(prioritys) {
		return prioritys.map( (priority, index) => {
			return (
				<div className='item' key={index} data-index={index} onClick={ () => {
					this.props.setPriorityFilter(index);
				}}>
					<div className={'ui empty circular label ' + priority.color}></div>
					{priority.text}
				</div>
			);
		});
	},

});

// require setPriorityFilter

export default FilterBox;
