import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/swipe.min.css';

export class Navigation extends Component {
    render() {
        return (
            <div className="navigation">
                <div className="container">
                    <div className="inside">
                        <div className="nav nav-tab menu">
                            <button className="btn"><img className="avatar-xl" src={require("../img/avatars/avatar-male-1.jpg")} alt="avatar" /></button>
                            <a href="#members" data-toggle="tab"><i className="material-icons">account_circle</i></a>
                            <a href="#discussions" data-toggle="tab" className="active"><i className="material-icons active">chat_bubble_outline</i></a>
                            {/* <a href="#notifications" data-toggle="tab" className="f-grow1"><i className="material-icons">notifications_none</i></a> */}
                            {/* <button className="btn mode"><i className="material-icons">brightness_2</i></button>
                            <a href="#settings" data-toggle="tab"><i className="material-icons">settings</i></a> */}
                            <Link to="/logout" className="btn power" ><i className="material-icons">power_settings_new</i></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}