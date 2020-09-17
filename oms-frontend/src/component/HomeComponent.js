import React, { Component } from 'react';

import {  Jumbotron } from 'reactstrap';
export class Home extends Component {

    render() {
      return (
         <div className="App">
            
             <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Start chatting Now!!!!!!!!!</h1>
                                <p>Sign up to connect with friends.</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
         </div>
      )
    }
}