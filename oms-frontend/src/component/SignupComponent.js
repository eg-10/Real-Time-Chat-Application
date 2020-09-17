import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Signup extends Component {

    render() {
      return (
        <div className="App">
            <div class="main order-md-2">
					<div class="start">
						<div class="container">
							<div class="col-md-12">
								<div class="content">
									<h1>Create Account</h1>
									
									<p>use your email for registration:</p>
									<form class="signup">
										<div class="form-parent">
											<div class="form-group">
												<input type="text" id="inputName" class="form-control" placeholder="Username" required></input>
												<button class="btn icon"><i class="material-icons">person_outline</i></button>
											</div>
											<div class="form-group">
												<input type="email" id="inputEmail" class="form-control" placeholder="Email Address" required></input>
												<button class="btn icon"><i class="material-icons">mail_outline</i></button>
											</div>
										</div>
										<div class="form-group">
											<input type="password" id="inputPassword" class="form-control" placeholder="Password" required></input>
											<button class="btn icon"><i class="material-icons">lock_outline</i></button>
										</div>
										<button type="submit" class="btn button" ><Link to="/">Sign Up</Link></button>
										<div class="callout">
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