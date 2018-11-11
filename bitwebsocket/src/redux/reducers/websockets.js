import {WebsocketActionType} from "../actions/websocketActions";


const initialState = null;

const websocketsReducer = (state = initialState,action) => {
    let nextState = state;
    switch (action.type) {
        case WebsocketActionType.CONNECT_WEBSOCKET:
            nextState = result;
            console.log(nextState);
            break;
        case WebsocketActionType.CONNECT_WEBSOCKET_SUCCESS:
            nextState = {...state,connected:true};
            console.log(nextState);
            break;
        case WebsocketActionType.DISCONNECT_WEBSOCKET:
            nextState = {...state,connected:true,toDisconnect:true}
        default:
            return state;
    }
    return nextState || state;
};
export default websocketsReducer;
