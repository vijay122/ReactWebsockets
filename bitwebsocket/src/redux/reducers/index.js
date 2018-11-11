import { combineReducers } from "redux";
//import { routerReducer } from "react-router-redux";
import tradesReducer from "./tradesReducer";
import orderBookReducer from "./orderBookReducer";

import websocketsReducer from "./websockets";

const rootReducer = combineReducers({
    websocketsReducer,
    tradesReducer,
    orderBookReducer
});

export default rootReducer;

