import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import todoApp from './reducer/reducers.js'

import App from './containers/App'
import DevTools from './containers/DevTools.js'
import store from './store/index.js'

let rootElement = document.getElementById('MainApp');

class MainComponent extends React.Component {
	render() {
		return (
			<div>
				<Provider store={store}>
					<div>
						<App />
						<DevTools/>
					</div>
				</Provider>
			</div>
		);
	}
}

ReactDOM.render(
	<MainComponent/>,
	rootElement
);
