import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import { Link, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

export class Signin extends Component {

	authenticate = e => {
		e.preventDefault();
		this.props.login(e.target.username.value, e.target.password.value);
		console.log(e.target.username.value,"tried");
	};

	render() {
		return (
			this.props.isAuthenticated ?
			<Redirect to="/" />
			: <div className="App">
				<main>
					<div className="layout">
						<div className="main order-md-1">
							<div className="start">
								<div className="container">
									<div className="col-md-12">
										<div className="content">
											<h1>Login</h1>
											<p className="text-danger">{this.props.error}</p>
											<p>{this.props.token}</p><p>{this.props.username}</p>
											<form method="POST" onSubmit={this.authenticate}>
												<div className="form-group">
													<input name="username" type="text" id="inputUsername" className="form-control" placeholder="Username" required></input>
													<button className="btn icon"><i className="material-icons">person_outline</i></button>
												</div>
												<div className="form-group">
													<input name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required></input>
													<button className="btn icon"><i className="material-icons">lock_outline</i></button>
												</div>
												<button type="submit" className="btn button" >Login</button>
												<div className="callout">
													<span>Don't have account? <a href="sign-up.html">Create Account</a></span>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
			

		)
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
		loading: state.auth.loading,
		token: state.auth.token,
		username: state.auth.username,
		error: state.auth.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		login: (userName, password) =>
			dispatch(actions.authLogin(userName, password)),
		logout: () => dispatch(actions.logout())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Signin);