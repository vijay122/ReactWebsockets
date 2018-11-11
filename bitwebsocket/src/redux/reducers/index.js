import { combineReducers } from "redux";
//import { routerReducer } from "react-router-redux";
import tradesReducer from "./tradesReducer";
import orderBookReducer from "./orderBookReducer";
import websocketReducer from "./websockets";

const rootReducer = combineReducers({
    websocketReducer,
    tradesReducer,
    orderBookReducer
});

export default rootReducer;

