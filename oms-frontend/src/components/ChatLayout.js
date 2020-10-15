import React, { Component } from 'react';
import '../css/swipe.min.css';
import { connect } from "react-redux";

import {Navigation} from './Navigation';
import {Main } from './Main';
import { Sidebar } from './Sidebar';
import { Redirect } from 'react-router-dom';

class ChatLayout extends Component{
    render(){
        return(
            this.props.isAuthenticated ? 
            <div>
                <div className="layout">
					<Navigation/>
					<Sidebar/>
					<Main/>
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