import todoApp from '../reducer/reducers.js'

// Redux utility functions
import { compose, createStore, applyMiddleware } from 'redux';
// Redux DevTools store enhancers
import { persistState } from 'redux-devtools';

import DevTools from '../containers/DevTools';


//let store = createStore(todoApp)

const finalCreateStore = compose(
	// Enables your middleware:
	applyMiddleware(), // any Redux middleware, e.g. redux-thunk
	// Provides support for DevTools:
	DevTools.instrument(),
	// Lets you write ?debug_session=<name> in address bar to persist debug sessions
	persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const store = finalCreateStore(todoApp);

export default store
