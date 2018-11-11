import {TradeActionType} from "../actions/tradeActions";

const initialState = null;

const tradesReducer = (state = initialState,action) => {
    let nextState = state;
    switch (action.type) {
        case TradeActionType.SET_TRADES:
            const { data } = action.payload;

            nextState = data;
            console.log(nextState);
            break;
        default:
            return state;
    }
    return nextState || state;
};

export default tradesReducer;
