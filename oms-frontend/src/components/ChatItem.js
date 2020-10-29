import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../css/swipe.min.css';

import * as actions from '../store/actions/chat'

class ChatItem extends Component {
    render() {
        return (

            <Link
                onClick={() => {
                    console.log("chat clicked!");
                    this.props.setCurrentChat(this.props.chat);
                }}
                to="/#chat-layout"
                className={
                    this.props.active ? "filterDiscussions all unread single active" : "filterDiscussions all unread single"
                }>
                <img
                    className="avatar-md"
                    src={this.props.dp_url}
                    alt="avatar" />
                {/* <img className="avatar-md" src={require("../img/avatars/idaho.jpg")} data-toggle="tooltip" data-placement="top" title="Janette" alt="avatar" /> */}
                {
                    this.props.chat.updated ?
                    <div className="status">
                        <i className="material-icons online">fiber_manual_record</i>
                    </div> : null
                }
                {/* <div className="new bg-yellow">
                    <span>+7</span>
                </div> */}
                <div className="data">
                    <h5>{this.props.name}</h5>
                    <span>{this.props.time}</span>
                    <p>{this.props.last_message}</p>
                </div>
            </Link>

        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentChat: (chat) =>
            dispatch(actions.chatSelected(chat))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(ChatItem);