import React, { Component } from 'react';
import '../css/swipe.min.css';

export default class ChatItem extends Component {
    render() {
        return (

            <a href="#list-chat" className="filterDiscussions all unread single active" id="list-chat-list" data-toggle="list" role="tab">
                <img className="avatar-md" src={require("../img/avatars/avatar-female-1.jpg")} data-toggle="tooltip" data-placement="top" title="Janette" alt="avatar" />
                {/* <div className="status">
                    <i className="material-icons online">fiber_manual_record</i>
                </div> */}
                {/* <div className="new bg-yellow">
                    <span>+7</span>
                </div> */}
                <div className="data">
                    <h5>{this.props.name}</h5>
                    <span>{this.props.time}</span>
                    <p>{this.props.last_message}</p>
                </div>
            </a>

        );
    }
}