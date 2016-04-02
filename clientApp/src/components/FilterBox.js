
import React, { Component, PropTypes } from 'react';
const debug = require('debug')('app:FilterBox');

import _TYPES_ from '../config/Types.js';
import { CompletedFilters } from '../actions/todo.js';

// init types
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

let FilterBox = React.createClass({

	getInitialState() {
		return {
			value: null,
		};
	},

	componentDidMount() {
		$('.ui.dropdown').dropdown({
			// action = hide 不會自動顯示 dropdown 選取了什麼
			// 自動顯示的話會造成 react-id 重複
			action: 'hide',
		});
		$('#needTimeFilterInput').popup();
	},

	render() {

		let styles = {};

		styles.wrapper = {
			marginTop : '10px',
			// marginBottom : '100px',
		};

		styles.inputNeedTime = {
			width : '100px',
		};

		styles.colorBall = {
			marginLeft : '-10px',
		};

		styles.resetIcon = {
			marginTop : '-10px',
		};

		const currentType = _TYPES_[this.props.typeFilter] ||
			{ color : 'grey', text : 'Type Filter' };

		const completedItems = [
			{ text : '未完成', status : 0, value : CompletedFilters.SHOW_ACTIVE },
			{ text : '已完成', status : 0, value : CompletedFilters.SHOW_COMPLETED },
			{ text : '全部', status : 0, value : CompletedFilters.SHOW_ALL },
		];

		const {completedFilter} = this.props;

		return (
			<div className="ui grid" style={styles.warpper}>

				<div className='one wide column'></div>

				<div className='seven wide column'>
					<div className="ui buttons mini">
						{this.buildCompletedItems(completedItems, completedFilter)}
					</div>
				</div>

				<div className='four wide column'>
					<div className="ui floating dropdown labeled icon button mini">
						<i className="filter icon"></i>
						<span className='text' style={styles.colorBall}>
							<div className={'ui empty circular label ' + currentType.color}></div>
							{currentType.text}
						</span>
						<div className="menu">
							<div className="ui icon search input">
								<i className="search icon"></i>
								<input type="text" placeholder="Search tags..."/>
							</div>
							<div className="divider"></div>
							<div className="header">
								<i className="tags icon"></i>
								Types
							</div>
							<div className="scrolling menu">
								{this.buildTypeItems(_TYPES_)}
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
		if(min < 10)
			min = 0;
		return this.props.setNeeTimeFilter(parseInt(min, 10));
	},

	buildTypeItems() {
		return types.map( (type, index) => {
			return (
				<div className='item' key={index} data-index={index} onClick={ () => {
					this.props.setTypeFilter(type.key);
				}}>
					<div className={'ui empty circular label ' + type.color}></div>
					{type.text}
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
						return this.props.setCompletedFilter(item.value);
					}}
					onDoubleClick={ () => {
						return this.props.resetAllFilters(item.value);
					}}
				>
					{item.text}
				</button>
			);
		});
	},

});

// require setTypeFilter
// require setCompletedFilter

// require completedFilter
// require typeFilter

export default FilterBox;
