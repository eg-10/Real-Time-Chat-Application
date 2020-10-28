import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/swipe.min.css';

import * as actions from '../store/actions/chat'
import Message from './Message';
import { timeDiff } from '../utils';

class ChatWindow extends Component {


	constructor(props) {
		super(props);
		this.mesRef = React.createRef();
	}

	componentDidMount() {
		this.scrollToBottom();
	}

	componentDidUpdate() {
		this.scrollToBottom();
	}

	scrollToBottom = () => {
		if (this.mesRef.current) {
			this.mesRef.current.scrollTop = this.mesRef.current.scrollHeight;
		}
		else {
			console.log("no current!");
		}
	};

	onChatMessageSubmit = e => {
		e.preventDefault();
		let message_content = e.target.message_textarea.value;
		e.target.message_textarea.value = '';
		this.props.sendMessage(message_content, this.props.chat, this.props.user);
	}

	getPCName = chat => {
		let p = chat.participants.find(p => p.id !== this.props.customer_id);
		return p.user.first_name + ' ' + p.user.last_name;
	}

	getPCDP = chat => {
		let p = chat.participants.find(p => p.id !== this.props.customer_id);
		return p.profile_photo && p.profile_photo.length ? p.profile_photo : "no-profile.png";
	}

	render() {
		return (

			<div className="main">
				<div className="tab-content" id="nav-tabContent">
					{/* <!-- Start of Babble --> */}
					<div className="babble tab-pane fade active show" id="list-chat" role="tabpanel" aria-labelledby="list-chat-list">
						{/* <!-- Start of Chat --> */}
						{
							this.props.active ?
								<div className="chat">
									<div className="top">
										<div className="container">
											<div className="col-md-12">
												<div className="inside">
													<img
														className="avatar-md"
														src={
															this.props.chat.is_group ?
																"group-no-profile.jpg" :
																this.getPCDP(this.props.chat)
														}
														alt="avatar" />
													{/* <div className="status">
												<i className="material-icons online">fiber_manual_record</i>
											</div> */}
													<div className="data">
														<h5><a href="#">
															{
																this.props.chat.is_group ?
																	this.props.chat.name :
																	this.getPCName(this.props.chat)
															}
														</a></h5>
														{/* <span>Active now</span> */}
													</div>
													{/* <button className="btn connect d-md-block d-none" name="1"><i className="material-icons md-30">phone_in_talk</i></button> */}
													<button className="btn connect d-md-block d-none" name="1"><i className="material-icons md-36">videocam</i></button>
													<button className="btn d-md-block d-none mr-0"><i className="material-icons md-30">info</i></button>
													{/* <div className="dropdown">
													<button className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="material-icons md-30">more_vert</i></button>
													<div className="dropdown-menu dropdown-menu-right">
														<button className="dropdown-item connect" name="1"><i className="material-icons">phone_in_talk</i>Voice Call</button>
														<button className="dropdown-item connect" name="1"><i className="material-icons">videocam</i>Video Call</button>
														<hr/>
														<button className="dropdown-item"><i className="material-icons">clear</i>Clear History</button>
														<button className="dropdown-item"><i className="material-icons">block</i>Block Contact</button>
														<button className="dropdown-item"><i className="material-icons">delete</i>Delete Contact</button>
													</div>
												</div> */}
												</div>
											</div>
										</div>
									</div>
									<div className="content" id="content" ref={this.mesRef}>
										<div className="container">
											<div className="col-md-12">
												{/* <div className="date">
											<hr />
											<span>Yesterday</span>
											<hr />
										</div> */}
												{/* <Message message="We've got some killer ideas kicking about already." time="09:46 AM" /> */}
												{
													this.props.chat && this.props.chat.messages && this.props.chat.messages.length ?
														this.props.chat.messages.map(message => {
															return (
																<Message
																	key={message.id}
																	sender={message.sender.user.username}
																	me={message.sender.user.username === this.props.user}
																	message={message.text_content}
																	time={timeDiff(message.timestamp)}
																	dp_url={
																		message.sender.profile_photo && message.sender.profile_photo.length ?
																		message.sender.profile_photo :
																		"no-profile.png"
																	}
																/>
															);
														})
														: <p className="text-center">Send a message now!</p>

												}

												{/* <div className="message me">
													<div className="text-main">
														<div className="text-group me">
															<div className="text me">
																<p>Can't wait! How are we coming along with the client?</p>
															</div>
														</div>
														<span>11:32 AM</span>
													</div>
												</div> */}
												{/* <div className="message">
											<img className="avatar-md" src={require("../img/avatars/avatar-female-5.jpg")} data-toggle="tooltip" data-placement="top" title="Keith" alt="avatar" />
											<div className="text-main">
												<div className="text-group">
													<div className="text">
														<p>Coming along nicely, we've got a draft for the client quarries completed.</p>
													</div>
												</div>
												<span>02:56 PM</span>
											</div>
										</div> */}
												{/* <div className="message">
											<img className="avatar-md" src={require("../img/avatars/avatar-female-5.jpg")} data-toggle="tooltip" data-placement="top" title="Keith" alt="avatar" />
											<div className="text-main">
												<div className="text-group">
													<div className="text typing">
														<div className="wave">
															<span className="dot"></span>
															<span className="dot"></span>
															<span className="dot"></span>
														</div>
													</div>
												</div>
											</div>
										</div> */}
											</div>
										</div>
									</div>
									<div className="container">
										<div className="col-md-12">
											<div className="bottom">
												<form onSubmit={this.onChatMessageSubmit} className="position-relative w-100">
													<textarea className="form-control" name="message_textarea" placeholder="Start typing for reply..." rows="1" required></textarea>
													<button className="btn emoticons"><i className="material-icons">insert_emoticon</i></button>
													<button type="submit" className="btn send"><i className="material-icons">send</i></button>
												</form>
												<label>
													<input type="file" />
													<span className="btn attach d-sm-block d-none"><i className="material-icons">attach_file</i></span>
												</label>
											</div>
										</div>
									</div>
								</div>
								: <h5 className="text-center mt-5 pt-5">Select a Chat from your left or Create a New Chat<br />to Get Started!</h5>
						}
						{/* <!-- End of Chat -->
									<!-- Start of Call --> */}
						{/* <div className="call" id="call1">
							<div className="content">
								<div className="container">
									<div className="col-md-12">
										<div className="inside">
											<div className="panel">
												<div className="participant">
													<img className="avatar-xxl" src={require("../img/avatars/avatar-female-5.jpg")} alt="avatar" />
													<span>Connecting</span>
												</div>
												<div className="options">
													<button className="btn option"><i className="material-icons md-30">mic</i></button>
													<button className="btn option"><i className="material-icons md-30">videocam</i></button>
													<button className="btn option call-end"><i className="material-icons md-30">call_end</i></button>
													<button className="btn option"><i className="material-icons md-30">person_add</i></button>
													<button className="btn option"><i className="material-icons md-30">volume_up</i></button>
												</div>
												<button className="btn back" name="1"><i className="material-icons md-24">chat</i></button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div> */}
						{/* <!-- End of Call --> */}
					</div>
					{/* <div className="babble tab-pane fade" id="list-empty" role="tabpanel" aria-labelledby="list-empty-list">
						<div className="chat" id="chat2">
							<div className="top">
								<div className="container">
									<div className="col-md-12">
										<div className="inside">
											<a href="#"><img className="avatar-md" src={require("../img/avatars/avatar-female-2.jpg")} data-toggle="tooltip" data-placement="top" title="Lean" alt="avatar" /></a>
											<div className="status">
												<i className="material-icons offline">fiber_manual_record</i>
											</div>
											<div className="data">
												<h5><a href="#">Lean Avent</a></h5>
												<span>Inactive</span>
											</div>
											<button className="btn connect d-md-block d-none" name="2"><i className="material-icons md-30">phone_in_talk</i></button>
											<button className="btn connect d-md-block d-none" name="2"><i className="material-icons md-36">videocam</i></button>
											<button className="btn d-md-block d-none"><i className="material-icons md-30">info</i></button>
											<div className="dropdown">
												<button className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="material-icons md-30">more_vert</i></button>
												<div className="dropdown-menu dropdown-menu-right">
													<button className="dropdown-item connect" name="2"><i className="material-icons">phone_in_talk</i>Voice Call</button>
													<button className="dropdown-item connect" name="2"><i className="material-icons">videocam</i>Video Call</button>
													<hr />
													<button className="dropdown-item"><i className="material-icons">clear</i>Clear History</button>
													<button className="dropdown-item"><i className="material-icons">block</i>Block Contact</button>
													<button className="dropdown-item"><i className="material-icons">delete</i>Delete Contact</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="content empty">
								<div className="container">
									<div className="col-md-12">
										<div className="no-messages">
											<i className="material-icons md-48">forum</i>
											<p>Seems people are shy to start the chat. Break the ice send the first message.</p>
										</div>
									</div>
								</div>
							</div>
							<div className="container">
								<div className="col-md-12">
									<div className="bottom">
										<form className="position-relative w-100">
											<textarea className="form-control" placeholder="Start typing for reply..." rows="1"></textarea>
											<button className="btn emoticons"><i className="material-icons">insert_emoticon</i></button>
											<button type="submit" className="btn send"><i className="material-icons">send</i></button>
										</form>
										<label>
											<input type="file" />
											<span className="btn attach d-sm-block d-none"><i className="material-icons">attach_file</i></span>
										</label>
									</div>
								</div>
							</div>
						</div>
						<div className="call" id="call2">
							<div className="content">
								<div className="container">
									<div className="col-md-12">
										<div className="inside">
											<div className="panel">
												<div className="participant">
													<img className="avatar-xxl" src={require("../img/avatars/avatar-female-2.jpg")} alt="avatar" />
													<span>Connecting</span>
												</div>
												<div className="options">
													<button className="btn option"><i className="material-icons md-30">mic</i></button>
													<button className="btn option"><i className="material-icons md-30">videocam</i></button>
													<button className="btn option call-end"><i className="material-icons md-30">call_end</i></button>
													<button className="btn option"><i className="material-icons md-30">person_add</i></button>
													<button className="btn option"><i className="material-icons md-30">volume_up</i></button>
												</div>
												<button className="btn back" name="2"><i className="material-icons md-24">chat</i></button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div> */}
					{/* <div className="babble tab-pane fade" id="list-request" role="tabpanel" aria-labelledby="list-request-list">
						<div className="chat" id="chat3">
							<div className="top">
								<div className="container">
									<div className="col-md-12">
										<div className="inside">
											<a href="#"><img className="avatar-md" src={require("../img/avatars/avatar-female-6.jpg")} data-toggle="tooltip" data-placement="top" title="Louis" alt="avatar" /></a>
											<div className="status">
												<i className="material-icons offline">fiber_manual_record</i>
											</div>
											<div className="data">
												<h5><a href="#">Louis Martinez</a></h5>
												<span>Inactive</span>
											</div>
											<button className="btn disabled d-md-block d-none" disabled><i className="material-icons md-30">phone_in_talk</i></button>
											<button className="btn disabled d-md-block d-none" disabled><i className="material-icons md-36">videocam</i></button>
											<button className="btn d-md-block disabled d-none" disabled><i className="material-icons md-30">info</i></button>
											<div className="dropdown">
												<button className="btn disabled" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled><i className="material-icons md-30">more_vert</i></button>
												<div className="dropdown-menu dropdown-menu-right">
													<button className="dropdown-item"><i className="material-icons">phone_in_talk</i>Voice Call</button>
													<button className="dropdown-item"><i className="material-icons">videocam</i>Video Call</button>
													<hr />
													<button className="dropdown-item"><i className="material-icons">clear</i>Clear History</button>
													<button className="dropdown-item"><i className="material-icons">block</i>Block Contact</button>
													<button className="dropdown-item"><i className="material-icons">delete</i>Delete Contact</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="content empty">
								<div className="container">
									<div className="col-md-12">
										<div className="no-messages request">
											<a href="#"><img className="avatar-xl" src={require("../img/avatars/avatar-female-6.jpg")} data-toggle="tooltip" data-placement="top" title="Louis" alt="avatar" /></a>
											<h5>Louis Martinez would like to add you as a contact. <span>Hi Keith, I'd like to add you as a contact.</span></h5>
											<div className="options">
												<button className="btn button"><i className="material-icons">check</i></button>
												<button className="btn button"><i className="material-icons">close</i></button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="container">
								<div className="col-md-12">
									<div className="bottom">
										<form className="position-relative w-100">
											<textarea className="form-control" placeholder="Messaging unavailable" rows="1" disabled></textarea>
											<button className="btn emoticons disabled" disabled><i className="material-icons">insert_emoticon</i></button>
											<button className="btn send disabled" disabled><i className="material-icons">send</i></button>
										</form>
										<label>
											<input type="file" disabled />
											<span className="btn attach disabled d-sm-block d-none"><i className="material-icons">attach_file</i></span>
										</label>
									</div>
								</div>
							</div>
						</div>
					</div> */}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.auth.username,
		customer_id: state.auth.customer_id,
		active: state.chat.current_chat !== null,
		chat: state.chat.current_chat,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		sendMessage: (message_content, chat, username) =>
			dispatch(actions.chatMessageSend(message_content, chat, username))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatWindow);