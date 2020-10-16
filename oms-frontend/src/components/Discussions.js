import React, { Component } from 'react';
import '../css/swipe.min.css';
import { connect } from "react-redux";

import * as actions from '../store/actions/chat'
import ChatItem from './ChatItem';

class Discussions extends Component {

	render() {
		return (
			<div id="discussions" className="tab-pane fade active show">
				{/* <div className="search">
					<form className="form-inline position-relative">
						<input type="search" className="form-control" id="conversations" placeholder="Search for conversations..." />
						<button type="button" className="btn btn-link loop"><i className="material-icons">search</i></button>
					</form>
					<button className="btn create" data-toggle="modal" data-target="#startnewchat"><i className="material-icons">create</i></button>
				</div>
				<div className="list-group sort">
					<button className="btn filterDiscussionsBtn active show" data-toggle="list" data-filter="all">All</button>
					<button className="btn filterDiscussionsBtn" data-toggle="list" data-filter="read">Read</button>
					<button className="btn filterDiscussionsBtn" data-toggle="list" data-filter="unread">Unread</button>
				</div> */}
				<div className="discussions">
					<h1>Chats</h1>
					<div className="list-group" id="chats" role="tablist">
						{/* <a href="#list-chat" className="filterDiscussions all read single" id="list-chat-list2" data-toggle="list" role="tab">
							<img className="avatar-md" src={require("../img/avatars/avatar-female-2.jpg")} data-toggle="tooltip" data-placement="top" title="Lean" alt="avatar" />
							<div className="status">
								<i className="material-icons offline">fiber_manual_record</i>
							</div>
							<div className="data">
								<h5>Lean Avent</h5>
								<span>Tus</span>
								<p>Hey Chris, could i ask you to help me out with variation...</p>
							</div>
						</a> */}
						{
							this.props.chats && this.props.chats.length ?
								this.props.chats.map(chat => {
									return (
										<ChatItem
											key={chat.id}
											active={this.props.current_chat && this.props.current_chat.id === chat.id}
											name={"Chat " + chat.id}
											time={
												new Date(chat.last_active.split("T").join(" ")).toLocaleTimeString()
											}
											last_message={
												chat.messages.length ?
													chat.messages[chat.messages.length - 1].text_content
													: null
											}
											chat={chat}
											
										/>
									);
								})
								: <p className="text-center">You haven't started chattting yet!</p>
						}
						<a className="filterDiscussions all unread single active">
							{/* <img className="avatar-md" src={require("../img/avatars/avatar-female-1.jpg")} data-toggle="tooltip" data-placement="top" title="Janette" alt="avatar" />
							<div className="status">
								<i className="material-icons online">fiber_manual_record</i>
							</div>
							<div className="new bg-yellow">
								<span>+7</span>
							</div>
							<div className="data">
								<h5>Janette Dalton</h5>
								<span>Mon</span>
								<p>A new feature has been updated to your account. Check it out...</p>
							</div> */}
						</a>
						{/* <a href="#list-chat" className="filterDiscussions all unread single active">
							<img className="avatar-md" src={require("../img/avatars/avatar-female-1.jpg")} data-toggle="tooltip" data-placement="top" title="Janette" alt="avatar" />
							<div className="status">
								<i className="material-icons online">fiber_manual_record</i>
							</div>
							<div className="new bg-yellow">
								<span>+7</span>
							</div>
							<div className="data">
								<h5>Janette Dalton</h5>
								<span>Mon</span>
								<p>A new feature has been updated to your account. Check it out...</p>
							</div>
						</a> */}
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		chats: state.chat.chats,
		contacts: state.chat.contacts,
		current_chat: state.chat.current_chat,
	};
};

export default connect(
	mapStateToProps
)(Discussions);
