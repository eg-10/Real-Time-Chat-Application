import { HOST_URL } from "../../settings";
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utilities";

const initialState = {
    chats: null,
    contacts: null,
    current_chat: null,
    contacts_loading: false,
    error: null,
    chats_loading: false,
    dp_url: null,
};

const chatInit = (state, action) => {
    console.log("chats", action.chats);
    console.log("contact", action.contacts);
    // let dp_url = action.dp_url;
    // if (dp_url && dp_url.length) {
    //     dp_url = HOST_URL + dp_url;
    // }
    console.log("dp url: ", action.dp_url);
    return updateObject(state, {
        chats: action.chats,
        contacts: action.contacts,
        dp_url: action.dp_url,
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
    let active_chat = updated_chats.splice(chat_index, 1);
    if (action.message.sender.profile_photo) {
        action.message.sender.profile_photo = HOST_URL + action.message.sender.profile_photo;
        console.log(action.message.profile_photo);
    }
    active_chat[0].messages.push(action.message);
    active_chat[0].last_active = action.message.timestamp;
    updated_chats.unshift(active_chat[0]);
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

const chatCreateGroupStart = (state, action) => {
    return updateObject(state, {
        chats_loading: true,
    });
};

const chatCreateGroupSuccess = (state, action) => {
    return updateObject(state, {
        chats_loading: false,
        chats: [action.new_chat, ...state.chats],
        current_chat: action.new_chat,
    });
};

const chatCreateGroupFail = (state, action) => {
    return updateObject(state, {
        chats_loading: false,
    });
};

const chatCreatePCStart = (state, action) => {
    return updateObject(state, {
        chats_loading: true,
    });
};

const chatCreatePCSuccess = (state, action) => {
    return updateObject(state, {
        chats_loading: false,
        chats: [action.new_chat, ...state.chats],
        current_chat: action.new_chat,
    });
};

const chatCreatePCFail = (state, action) => {
    return updateObject(state, {
        chats_loading: false,
    });
};

const chatChangeDPSuccess = (state, action) => {
    let dp_url = action.dp_url;
    if (dp_url && dp_url.length) {
        dp_url = HOST_URL + dp_url;
    }
    return updateObject(state, {
        dp_url: dp_url,
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
        case actionTypes.CHAT_CREATE_GROUP_START:
            return chatCreateGroupStart(state, action);
        case actionTypes.CHAT_CREATE_GROUP_SUCCESS:
            return chatCreateGroupSuccess(state, action);
        case actionTypes.CHAT_CREATE_GROUP_FAIL:
            return chatCreateGroupFail(state, action);
        case actionTypes.CHAT_CREATE_PC_START:
            return chatCreatePCStart(state, action);
        case actionTypes.CHAT_CREATE_PC_SUCCESS:
            return chatCreatePCSuccess(state, action);
        case actionTypes.CHAT_CREATE_PC_FAIL:
            return chatCreatePCFail(state, action);
        case actionTypes.CHAT_CHANGE_DP_SUCCESS:
            return chatChangeDPSuccess(state, action);
        default:
            return state;
    }
};

export default reducer;