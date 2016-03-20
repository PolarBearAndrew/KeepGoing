
import React, { Component, PropTypes } from 'react';
const debug = require('debug')('app:FilterBox');

import Prioritys from '../config/Priority.js';
import { CompletedFilters } from '../actions/todo.js';

let FilterBox = React.createClass({

	getInitialState() {
		// Prioritys = Prioritys.reverse();
		return {
			value: null,
		};
	},

	componentDidMount() {
		$('.ui.dropdown').dropdown({
			 // 不會自動顯示 dropdown 選取了什麼, 自動顯示的話會造成 react-id 重複
			action: 'hide',
		});
		$('#needTimeFilterInput').popup();
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

		const completedItems = [
			{ text : '未完成', status : 0, value : CompletedFilters.SHOW_ACTIVE },
			{ text : '已完成', status : 0, value : CompletedFilters.SHOW_COMPLETED },
			{ text : '全部', status : 0, value : CompletedFilters.SHOW_ALL },
		];

		const {completedFilter} = this.props;

		return (
			<div className="ui grid" style={styles.warpper}>

				<div className='one wide column'></div>

				<div className='six wide column'>
					<div className="ui buttons mini">
						{this.buildCompletedItems(completedItems, completedFilter)}
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
						<input
							id='needTimeFilterInput'
							type="number"
							placeholder=":min"
							onChange={this.handleNeedTimeFilterChange}
							// popup
							data-variation="mini"
							data-content="數值至少大於 10 才會進行篩選"
						/>
						<i className="clock icon"></i>
					</div>
				</div>

			</div>
		);
	},

	handleNeedTimeFilterChange(e) {
		let min = e.target.value || 0;
		if(min < 10 && this.props.needTimeFilter >= 10)
			return this.props.setNeeTimeFilter(parseInt(min, 10));
		else if(min < 10)
			return false;
		else
			return this.props.setNeeTimeFilter(parseInt(min, 10));
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

	buildCompletedItems(completedItems, filter) {
		completedItems.forEach( item => {
			if(item.value == filter) item.status = 1;
		});
		return completedItems.map( item => {
			let style = item.status ? 'ui button olive' : 'ui button';
			return (
				<button
					className={style}
					key={item.value}
					onClick={ () => {
						this.props.setCompletedFilter(item.value);
					}}
				>
					{item.text}
				</button>
			);
		});
	},

});

// require setPriorityFilter
// require setCompletedFilter

// require completedFilter
// require priorityFilter

export default FilterBox;
