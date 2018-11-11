import TradeActions from "./tradeActions";
import Websocket from "./websocketActions";
import BookActions from "./bookActions";

const ActionCreators = {
    ...TradeActions,
    ...Websocket,
    ...BookActions
};

export default ActionCreators;
