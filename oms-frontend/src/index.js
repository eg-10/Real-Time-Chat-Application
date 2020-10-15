import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from 'react-redux';

import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';
import './dist/css/lib/bootstrap.min.css';
import './dist/css/swipe.min.css';

import authReducer from "./store/reducers/auth";
import chatReducer from "./store/reducers/chat";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function configureStore() {
	const rootReducer = combineReducers({
		auth: authReducer,
		chat: chatReducer
	});

	const store = createStore(
		rootReducer,
		composeEnhancers(applyMiddleware(thunk))
	);

	return store;
}

const store = configureStore();


ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
