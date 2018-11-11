export const TradeActionType = {
    SET_TRADES: "SET_TRADES",
    SET_TRADES_CHANNEL_ID: "SET_TRADES_CHANNEL_ID",
    GET_TRADES: "GET_TRADES",
};


const setTradeData = (data) => ({
    type: TradeActionType.SET_TRADES,
    payload: { data },
});

export default {
    setTradeData
}
