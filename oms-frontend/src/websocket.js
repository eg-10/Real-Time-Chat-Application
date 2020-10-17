import { SOCKET_URL } from "./settings";
import { store } from "./index"
import * as actions from "./store/actions/chat"

export class WebSocketService {

	constructor() {
		this.socketRef = null;
	}

	connect(chat_id) {
		const path = `${SOCKET_URL}/ws/chat/${chat_id}/`;
		this.socketRef = new WebSocket(path);
		this.socketRef.onopen = () => {
			console.log("WebSocket open for " + String(chat_id));
		};
		this.socketRef.onmessage = e => {
			this.socketNewMessage(e.data);
		};
		this.socketRef.onerror = e => {
			console.log(e.message);
		};
		this.socketRef.onclose = () => {
			console.log("WebSocket closed let's reopen");
			this.connect();
		};
	}

	socketNewMessage(data) {
		const parsedData = JSON.parse(data);
		const type = parsedData.type;
		if (type === "new_chat_message") {
			store.dispatch(actions.chatMessageRecieve(parsedData.message));
		}
	}

	sendNewMessage(message_content, username) {
		try {
			this.socketRef.send(JSON.stringify({
				type: "new_chat_message",
				message: message_content,
				sender: username
			}));
		}
		catch(err) {
			console.log(err.message);
		}
	}
}