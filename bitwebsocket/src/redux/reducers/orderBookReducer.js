import {BookActionType} from "../actions/bookActions";

const initialState = null;

const orderBookReducer = (state = initialState,action) => {
    let nextState = state;
    switch (action.type) {
        case BookActionType.SET_BOOKS:
            const { result } = action.payload;
            nextState = result;
            console.log(nextState);
            break;
        default:
            return state;
    }
    return nextState || state;
};
export default orderBookReducer;
