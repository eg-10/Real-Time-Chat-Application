import React, { Component } from 'react';
import '../css/swipe.min.css';
import { connect } from "react-redux";

import Navigation from './Navigation';
import ChatWindow from './ChatWindow';
import { Sidebar } from './Sidebar';
import { Redirect, Route, Switch } from 'react-router-dom';
import Contacts from './Contacts';

class ChatLayout extends Component{
    render(){
        return(
            this.props.isAuthenticated ? 
            <div>
                <div className="layout" id="chat-layout">
					<Navigation />
					<Sidebar />
                    <Switch>
                        <Route path="/contacts" component={Contacts} />
                        <Route path="/" component={ChatWindow} />
                    </Switch>
                </div>   
            </div>
            : <Redirect to="/login" />
        )
    }
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

export default connect(mapStateToProps)(ChatLayout);