
import React, { Component, PropTypes } from 'react';

// import { Width } from '../config/Styles';

export default class FilterBox extends Component {

	render() {

		let styles = {};

		styles.wrapper = {
			marginTop : '0px',
			marginBottom : '100px',
		};

		return (
			<div className="ui container" style={styles.warpper}>
				<br/>
				<div className='three wide column'>
					<div className="ui buttons">
						<button className="ui button">One</button>
						<button className="ui button">Two</button>
						<button className="ui button">Three</button>
					</div>
				</div>
			</div>
		);
	}

}


export default FilterBox;
