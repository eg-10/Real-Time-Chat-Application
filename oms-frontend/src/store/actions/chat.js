import axios from "axios";
import * as actionTypes from "./actionTypes";
import { HOST_URL } from "../../settings";

export const chatInit = (chats, contacts) => {
	return {
        type: actionTypes.CHAT_INIT,
        chats: chats,
        contacts: contacts,
	};
};