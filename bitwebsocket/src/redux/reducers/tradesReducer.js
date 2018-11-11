import {TradeActionType} from "../actions/tradeActions";

const initialState = null;

const tradesReducer = (state = initialState,action) => {
    let nextState = state;
    switch (action.type) {
        case TradeActionType.SET_TRADES:
            const { result } = action.payload;
            nextState = result;
            console.log(nextState);
            break;
        default:
            return state;
    }
    return nextState || state;
};
export default tradesReducer;
