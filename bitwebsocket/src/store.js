import { createStore, applyMiddleware } from "redux";
import { routerMiddleware } from "react-router-redux";
//import createHistory from "history/createBrowserHistory";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./redux/reducers";

//export const history = createHistory();


const initialState = {};
const enhancers = [];
const middleware = [
    //routerMiddleware(history),
];

if (process.env.NODE_ENV === "development") {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === "function") {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = composeWithDevTools(
    applyMiddleware(...middleware),
    ...enhancers
);

const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers
);

export default store;
