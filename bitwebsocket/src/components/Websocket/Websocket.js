import React, { Component } from 'react';
import Sockette from 'sockette';
const WEB_SOCKET_ENDPOINT ="wss://api.bitfinex.com/ws/2";


export default class WebSocket extends React.Component {
    ws = null;
    message="";
    constructor()
{
    super();
     this.ws = new Sockette(WEB_SOCKET_ENDPOINT, {
        timeout: 5e3,
        maxAttempts: 10,
        onopen: e => {
            debugger;
            console.log('Connected!', e);
            this.setupWebSocket();
            },
        onmessage: e => {
            debugger;
            console.log('Received:', e);

            if(e.data) {
                this.setState({message: e.data});
            }
        },
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
          this.tradeMessage = JSON.stringify({
              event: 'subscribe',
              channel: 'trades',
              symbol: 'tBTCUSD'
          });
          this.bookMessage = JSON.stringify({
              event: 'subscribe',
              channel: 'book',
              symbol: 'tBTCUSD'
          })
          this.ws.send(this.tradeMessage);
          this.ws.send(this.bookMessage);
    }

    render() {
        return <div>
            {this.props.children}
        </div>;
    }
}
WebSocket.defaultProps = {
    maxAttempts: 5,
};
