const { createStore, combineReducers } = require("redux");

const initialState = {
    username: ''
};

export function getUsername(info) {
    return {
        type: "SET_USERNAME",
        payload: info
    }
}

const userReducer = (state = initialState, action) => {
    if (action.type === "SET_USERNAME") {
        return {
            username: [...state.username, action.payload]
        }
    } else {
        return state;
    }
};

const rootReducer = combineReducers({
    userReducer: userReducer
})

export const userStore = createStore(rootReducer) 
