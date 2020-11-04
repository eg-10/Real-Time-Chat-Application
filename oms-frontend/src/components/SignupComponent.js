import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import { Link, Redirect } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

export class Signup extends Component {

	authenticate = e => {
		e.preventDefault();
		this.props.register(
			e.target.username.value,
			e.target.email.value,
			e.target.first_name.value,
			e.target.last_name.value,
			e.target.password.value
		);
		console.log(e.target.username.value, "treid")
	};

	render() {
		return (
			this.props.isAuthenticated ?
				<Redirect to="/" /> :
				<div className="App">
					<div className="main order-md-2">
						<div className="start">
							<div className="container">
								<div className="col-md-12">
									<div className="content">
										<h1>Create Account</h1>
										<form className="signup" method="POST" onSubmit={this.authenticate}>
											<div className="form-parent">
												<div className="form-group">
													<input name="username" type="text" id="inputUsername" className="form-control" placeholder="Username" required></input>
													<button className="btn icon"><i className="material-icons">person_outline</i></button>
												</div>
												<div className="form-group">
													<input name="email" type="email" id="inputEmail" className="form-control" placeholder="Email Address" required></input>
													<button className="btn icon"><i className="material-icons">mail_outline</i></button>
												</div>
											</div>
											<div className="form-parent">
												<div className="form-group">
													<input name="first_name" type="text" id="inputFirstName" className="form-control" placeholder="First Name" required></input>
												</div>
												<div className="form-group">
													<input name="last_name" type="text" id="inputLastName" className="form-control" placeholder="Last Name" required></input>
												</div>
											</div>
											<div className="form-group">
												<input name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required></input>
												<button className="btn icon"><i className="material-icons">lock_outline</i></button>
											</div>
											<button type="submit" className="btn button" >{this.props.loading ? <CircularProgress /> : "Sign Up"}</button>
											<div className="callout">
												<span>Already a member? <a href="sign-in.html">Sign In</a></span>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
		loading: state.auth.loading,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		register: (username, email, first_name, last_name, password) =>
			dispatch(actions.authSignup(username, password, email, first_name, last_name))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Signup);