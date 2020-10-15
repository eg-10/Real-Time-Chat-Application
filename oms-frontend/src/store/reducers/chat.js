import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utilities";

const initialState = {
    chats: null,
    contacts: null,
};

const chatInit = (state, action) => {
    return updateObject(state, {
        chats: action.chats,
        contacts: action.contacts,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHAT_INIT:
            return chatInit(state, action);
        default:
            return state;
    }
};

export default reducer;