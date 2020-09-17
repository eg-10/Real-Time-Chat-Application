import React from 'react';

import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'; 
import { Signup } from './component/SignupComponent';
import { Signin } from './component/SigninComponent';
import {Home }from './component/HomeComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Header } from './component/HeaderComponent';

function App() {

  
  return (
    <Router>
    <div className="App">
      
     < Header/>
      
    </div>
    <Switch>
    <Route exact path='/' component={Home}></Route> 
    <Route exact path='/signup' component={Signup}></Route> 
    <Route exact path='/signin' component={Signin}></Route> 
    </Switch>
    </Router>
    
  );
  
}

export default App;
