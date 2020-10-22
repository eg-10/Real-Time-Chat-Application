import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../css/swipe.min.css';

export class Navigation extends Component {
    render() {
        return (
            <div className="navigation">
                <div className="container">
                    <div className="inside">
                        <div className="nav nav-tab menu">
                            <button className="btn"><img className="avatar-xl" src={require("../img/avatars/avatar-male-1.jpg")} alt="avatar" /></button>
                            <NavLink activeClassName="active" to="/contacts" className="material-icons">account_circle</NavLink>
                            <NavLink exact to="/" activeClassName="active" className="material-icons">chat_bubble_outline</NavLink>
                            {/* <a href="#notifications" data-toggle="tab" className="f-grow1"><i className="material-icons">notifications_none</i></a> */}
                            {/* <button className="btn mode"><i className="material-icons">brightness_2</i></button>
                            <a href="#settings" data-toggle="tab"><i className="material-icons">settings</i></a> */}
                            <NavLink to="/logout" activeClassName="active" className="btn power material-icons">power_settings_new</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}