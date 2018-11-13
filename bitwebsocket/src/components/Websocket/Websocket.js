import React from 'react';
import Sockette from 'sockette';
const WEB_SOCKET_ENDPOINT ="wss://api.bitfinex.com/ws/2";
import ActionCreators from "../../redux/actions";
import { connect } from "react-redux";

export class WebSocket extends React.Component {
    ws = null;
    message="";
    constructor()
{
    super();
    this.state={
        tradeSymbol:"tBTCUSD",
        bookSymbol:"tBTCUSD",
    }
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
                    if(response.channel == "ticker")
                    {
                        this.tickerChannelId = response.chanId;
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
                        this.props.dispatch(ActionCreators.setBookData(response));
                    }
                    if(response[0]==this.tickerChannelId && Array.isArray(response[1]))
                    {
                        //To send ticker data. Todo
                   //     this.props.dispatch(ActionCreators.setBookData(response));
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
              channel: 'trade',
              symbol: this.state.tradeSymbol
          });
          this.tickerMessage = JSON.stringify({
              event: 'subscribe',
              channel: 'ticker',
              symbol: this.state.tradeSymbol
          });
          this.bookMessage = JSON.stringify({
              "event": "subscribe",
              "channel": "book",
              "symbol": "tBTCUSD"
          })
          this.ws.send(this.bookMessage);
          this.ws.send(this.tickerMessage);
    }
    componentDidUpdate()
    {
        if(this.state.toDisconnect==true)
        {
            this.ws.close();
        }
    }

    render() {
        const children = React.Children.map(this.props.children, (child, index) => {
            return React.cloneElement(child, {
                index,
                isActive: index === this.state,
            });
        });
       return(children);
    }

    /*Identify state changes and only render if new change happens  GDSFS*/
    static getDerivedStateFromProps(newProps, prevState) {
        if(newProps && newProps.websockets && newProps.websockets.toDisconnect===true) {
            return {...prevState, toDisconnect:true}
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
