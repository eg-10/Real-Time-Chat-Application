import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import authReducer from "./store/reducers/auth";

import './index.css';
import App from './App';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';
import * as serviceWorker from './serviceWorker';
import './dist/css/lib/bootstrap.min.css';
import './dist/css/swipe.min.css';
import { Provider } from 'react-redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function configureStore() {
	const rootReducer = combineReducers({
		auth: authReducer
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
