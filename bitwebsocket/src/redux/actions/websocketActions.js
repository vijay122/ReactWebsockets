export const WebsocketActionType = {
    CONNECT_WEBSOCKET: "CONNECT_WEBSOCKET",
    DISCONNECT_WEBSOCKET: "DISCONNECT_WEBSOCKET",
};


const disconnectWebsocket = (data) => ({
    type: WebsocketActionType.DISCONNECT_WEBSOCKET,
    payload: { data },
});

const connectWebsocket = (data) => ({
    type: WebsocketActionType.CONNECT_WEBSOCKET,
    payload: { data },
});

export default {
    connectWebsocket,
    disconnectWebsocket
}
