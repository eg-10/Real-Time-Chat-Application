import React, { Component } from 'react';
import { connect } from "react-redux";

import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Signup from './components/SignupComponent';
import Signin from './components/SigninComponent';
import Header from './components/HeaderComponent';
import ChatWindow from './components/ChatLayout';
import { render } from 'react-dom';
import Logout from './components/Logout';
import { Contacts } from './components/Contacts';
import ChatLayout from './components/ChatLayout';

class App extends Component {

	render(){
		return (
			<Router>
				<div className="App">
					< Header />
				</div>
				<Switch>
					<Route exact path='/signup' component={Signup}></Route>
					<Route exact path='/login' component={Signin}></Route>
					<Route exact path='/logout' component={Logout}></Route>
					<Route path='/' component={ChatLayout}></Route>
				</Switch>
			</Router>
	
		);
	}

}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

export default connect(mapStateToProps)(App);