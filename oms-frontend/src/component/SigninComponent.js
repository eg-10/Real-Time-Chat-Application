import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

export class Signin extends Component {

    render() {
      return (
         
        <div className="App">
        
        <main> 
            <div className="layout">
            {/* <!-- Start of Sign In --> */}
            <div className="main order-md-1">
                <div className="start">
                    <div className="container">
                        <div className="col-md-12">
                            <div className="content">
                                <h1>Sign in </h1>
                               
                                <p>use your email account:</p>
                                <form>
                                    <div className="form-group">
                                        <input type="email" id="inputEmail" className="form-control" placeholder="Email Address" required></input>
                                        <button className="btn icon"><i className="material-icons">mail_outline</i></button>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required></input>
                                        <button className="btn icon"><i className="material-icons">lock_outline</i></button>
                                    </div>
                                    <button  className="btn button" ><Link to="/">Sign In</Link></button>
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