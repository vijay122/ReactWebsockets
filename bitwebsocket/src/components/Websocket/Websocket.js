import React, { Component } from 'react';
import Sockette from 'sockette';
const WEB_SOCKET_ENDPOINT ="wss://api.bitfinex.com/ws/2";
const { Provider, Consumer } = React.createContext();
import ActionCreators from "../../redux/actions";
import { connect } from "react-redux";

export class WebSocket extends React.Component {
    ws = null;
    message="";
    constructor()
{
    super();
    this.tradesChannelId='';
     this.ws = new Sockette(WEB_SOCKET_ENDPOINT, {
        timeout: 5e3,
        maxAttempts: 10,
        onopen: e => {
            console.log('Connected!', e);
            this.setupWebSocket();
            },
        onmessage: e => {
            console.log('Received:', e);

            if(e.data) {
                let response = JSON.parse(e.data);
                if(response.event=="subscribed")
                {
                    if(response.channel=="trades")
                    {
                        this.tradesChannelId = response.chanId;
                    }
                    if(response.channel == "book")
                    {
                        this.bookChannelId = response.chanId;
                    }
                }
                else if(Array.isArray(response))
                {
                    if(response[0]===this.tradesChannelId)
                    {
                        this.props.dispatch(ActionCreators.setTradeData(response));
                    }
                    if(response[0]=== this.bookChannelId)
                    {
                    //    this.props.dispatch(ActionCreators.setBookData(response));
                    }
                }
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
        const contextValue = {
            data: this.state,
        };

        const children = React.Children.map(this.props.children, (child, index) => {
            return React.cloneElement(child, {
                index,
                isActive: index === this.state,
            });
        });
       return(children);
        /*
        return <Provider value={contextValue}>
            {this.props.children}
        </Provider>
        */
    }
    static getDerivedStateFromProps(newProps, prevState) { // - GDSFS
        debugger;

        if(newProps && newProps.book && newProps.book.currentItems && newProps.book.currentItems[0] &&  newProps.book.currentItems[0].price != prevState.data[0].price)
        {
            return {data:newProps.book.currentItems};
        }
        return null;
    }
}


WebSocket.defaultProps = {
    maxAttempts: 5,
};


function mapStateToProps(state) {
    return {
        websockets: state.websocketReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return {  dispatch };
}


export default connect(mapStateToProps, mapDispatchToProps)(WebSocket);
