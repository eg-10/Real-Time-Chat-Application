import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utilities";

const initialState = {
    chats: null,
    contacts: null,
    current_chat: null,
};

const chatInit = (state, action) => {
    console.log("chats",action.chats);
    console.log("contact",action.contacts);
    return updateObject(state, {
        chats: action.chats,
        contacts: action.contacts,
    });
};

const chatSelected = (state, action) => {
    console.log("slected chat",action.chat);
    return updateObject(state, {
        current_chat: action.chat,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHAT_INIT:
            return chatInit(state, action);
        case actionTypes.CHAT_SELECTED:
            return chatSelected(state, action);
        default:
            return state;
    }
};

export default reducer;