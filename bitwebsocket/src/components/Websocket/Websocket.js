import React, { Component } from 'react';
import Sockette from 'sockette';
const WEB_SOCKET_ENDPOINT ="wss://api.bitfinex.com/ws/2";


export default class WebSocket extends React.Component {
    ws = null;
    constructor()
{
    super();
     this.ws = new Sockette(WEB_SOCKET_ENDPOINT, {
        timeout: 5e3,
        maxAttempts: 10,
        onopen: e => {
            console.log('Connected!', e);
            this.setupWebSocket();
            },
        onmessage: e => console.log('Received:', e),
        onreconnect: e => console.log('Reconnecting...', e),
        onmaximum: e => console.log('Stop Attempting!', e),
        onclose: e => console.log('Closed!', e),
        onerror: e => console.log('Error:', e)
    });
}

    initialize() {
        this.setupWebSocket();
    }
      setupWebSocket = () => {
          this.ws.send('Hello, world!');
          this.ws.json({type: 'ping'});
    }

    render() {
        return <span />;
    }
}
WebSocket.defaultProps = {
    maxAttempts: 5,
};
