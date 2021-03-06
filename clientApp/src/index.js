import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import todoApp from './reducer/reducers.js';

import App from './containers/App';
import DevTools from './containers/DevTools.js';
import store from './store/index.js';

let rootElement = document.getElementById('MainApp');

class MainComponent extends React.Component {

	constructor() {
		super();
		localStorage.setItem("debug", "app:*");
	}

	render() {

		return (
			<div>
				<Provider store={store}>
					<div>
						<App />
						{ /* <DevTools/>  // 如果要用這個 store 裡面也有一行要改 // DevTools.instrument(), */ }
					</div>
				</Provider>
				{
					// this.forkMeOnGithub()
				}
			</div>
		);

	}

	forkMeOnGithub() {

		let styles = {};

		styles.forkMeOnGithub = {
			position : 'absolute',
			top : 0,
			right : 0,
			border : 0,
		};

		return (
			<a href="https://github.com/PolarBearAndrew/KeepGoing">
				<img
					alt="Fork me on GitHub"
					data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"
					src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67"
					style={styles.forkMeOnGithub} />
			</a>
		);
	}


}

ReactDOM.render(
	<MainComponent/>,
	rootElement
);

// global variable
import moment from 'moment';
moment.locale('zh-TW');
window.moment = moment;
