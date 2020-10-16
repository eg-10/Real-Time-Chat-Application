import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/swipe.min.css';

import * as actions from '../store/actions/chat'

class ChatItem extends Component {
    render() {
        return (

            <a
                onClick={() => {
                    console.log("chat clicked!");
                    this.props.setCurrentChat(this.props.chat);
                }}
                href="#chat-layout"
                className={
                    this.props.active ? "filterDiscussions all unread single active" : "filterDiscussions all unread single"
                } 
                role="tab">
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