import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

export class Signin extends Component {

	authenticate = e => {
		e.preventDefault();
		this.props.login(e.target.username.value, e.target.password.value);
		console.log(e.target.username.value,"treid")
	};

	render() {
		return (

			<div className="App">

				<main>
					<div className="layout">
						<div className="main order-md-1">
							<div className="start">
								<div className="container">
									<div className="col-md-12">
										<div className="content">
											<h1>Sign in {this.props.token}</h1>
											<form method="POST" onSubmit={this.authenticate}>
												<div className="form-group">
													<input name="username" type="text" id="inputUsername" className="form-control" placeholder="Username" required></input>
													<button className="btn icon"><i className="material-icons">person_outline</i></button>
												</div>
												<div className="form-group">
													<input name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required></input>
													<button className="btn icon"><i className="material-icons">lock_outline</i></button>
												</div>
												<button type="submit" className="btn button" >Sign In</button>
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