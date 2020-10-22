import axios from "axios";

import * as actionTypes from "./actionTypes";
import { HOST_URL, SOCKET_URL } from "../../settings";
import { WebSocketService } from '../../websocket'

export const chatInit = (chats, contacts) => {
	return {
		type: actionTypes.CHAT_INIT,
		chats: chats,
		contacts: contacts,
	};
};

export const chatSelected = (chat) => {
	return {
		type: actionTypes.CHAT_SELECTED,
		chat: chat
	};
};

export const chatSendMessageStart = () => {
	return {
		type: actionTypes.CHAT_SEND_MESSAGE_START
	};
}

export const chatSendMessageSuccess = () => {
	return {
		type: actionTypes.CHAT_SEND_MESSAGE_SUCCESS
	};
}

export const chatSendMessageFail = () => {
	return {
		type: actionTypes.CHAT_SEND_MESSAGE_FAIL
	};
}

export const chatMessageRecieve = (message) => {
	return {
		type: actionTypes.CHAT_RECIEVE_MESSAGE,
		message: message
	}
}

export const chatAddContactStart = () => {
	return {
		type: actionTypes.CHAT_ADD_CONTACT_START,
	}
}

export const chatAddContactSuccess = contacts => {
	return {
		type: actionTypes.CHAT_ADD_CONTACT_SUCCESS,
		contacts: contacts,
	}
}

export const chatAddContactFail = error => {
	return {
		type: actionTypes.CHAT_ADD_CONTACT_FAIL,
		error: error,
	}
}

export const chatsConnectAndInit = (chats, contacts) => {
	return dispatch => {
		try {
			for (let chat of chats) {
				let wss = new WebSocketService();
				wss.connect(chat.id);
				chat.webSocketService = wss;
			}
			dispatch(chatInit(chats, contacts));
		}
		catch (err) {
			console.log(err.message);
		}
	}
}


export const chatMessageSend = (message_content, chat, username) => {
	return dispatch => {
		dispatch(chatSendMessageStart());
		try {
			chat.webSocketService.sendNewMessage(message_content, username);
			dispatch(chatSendMessageSuccess());
		}
		catch (err) {
			console.log(err.message);
			dispatch(chatSendMessageFail());
		}
	};
}

export const addContact = (contact_username, token) => {
	return dispatch => {
		dispatch(chatAddContactStart());
		token = 'Token ' + token;
		console.log(contact_username);
		axios.post(`${HOST_URL}/api/add-contact/`, {
			username: contact_username
		}, {
			headers: {
				Authorization: token
			}
		})
			.then(response => {
				console.log(response);
				if (response.data.contacts) {
					dispatch(chatAddContactSuccess(response.data.contacts));
				}
				else {
					dispatch(chatAddContactFail("Please enter a valid username!"));
				}
			})
			.catch(err => {
				console.log(err);
				dispatch(chatAddContactFail("Please enter a valid username!"));
			});
	}
}