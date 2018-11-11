//import { ProductsType } from "../actions/Products";

const initialState = null;

const websocketsReducer = (state = initialState,action) => {
    let nextState = state;
    switch (action.type) {
        case "Connected":
            const { result } = action.payload;
            nextState = result;
            console.log(nextState);
            break;
        default:
            return state;
    }
    return nextState || state;
};
export default websocketsReducer;
