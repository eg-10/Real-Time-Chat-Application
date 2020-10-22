import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utilities";

const initialState = {
    chats: null,
    contacts: null,
    current_chat: null,
    contacts_loading: false,
    error: null,
};

const chatInit = (state, action) => {
    console.log("chats", action.chats);
    console.log("contact", action.contacts);
    return updateObject(state, {
        chats: action.chats,
        contacts: action.contacts,
    });
};

const chatSelected = (state, action) => {
    return updateObject(state, {
        current_chat: action.chat,
    });
};

const chatMessageRecieve = (state, action) => {
    console.log("Recieved message", action.message);
    let updated_chats = [...state.chats];
    let updated_current_chat = state.current_chat ? { ...state.current_chat } : null;
    let chat_index = updated_chats.findIndex(chat => chat.id == action.message.chat);
    updated_chats[chat_index].messages.push(action.message);
    // if (updated_current_chat && updated_current_chat.id == action.message.chat) {
    //     updated_current_chat.messages.push(action.message);
    // }
    return updateObject(state, {
        chats: updated_chats,
        current_chat: updated_current_chat
    });
};

const chatAddContactStart = (state, action) => {
    return updateObject(state, {
        error: null,
        contacts_loading: true,
    });
};

const chatAddContactSuccess = (state, action) => {
    return updateObject(state, {
        contacts: action.contacts,
        error: null,
        contacts_loading: false,
    });
};

const chatAddContactFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        contacts_loading: false,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHAT_INIT:
            return chatInit(state, action);
        case actionTypes.CHAT_SELECTED:
            return chatSelected(state, action);
        case actionTypes.CHAT_RECIEVE_MESSAGE:
            return chatMessageRecieve(state, action);
        case actionTypes.CHAT_ADD_CONTACT_START:
            return chatAddContactStart(state, action);
        case actionTypes.CHAT_ADD_CONTACT_SUCCESS:
            return chatAddContactSuccess(state, action);
        case actionTypes.CHAT_ADD_CONTACT_FAIL:
            return chatAddContactFail(state, action);
        default:
            return state;
    }
};

export default reducer;