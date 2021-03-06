
import Websocket from "../../components/Websocket/Websocket";

import React, { Component } from 'react';
import OrderBook from "../OrderBook/OrderBook";
import Trades from "../Trades/Trades";
import './Dashboard.scss';
import { Container, Row, Col } from 'react-grid-system';

export default class Dashboard extends Component {
    constructor()
    {
        super();
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
    }

    render() {
        return (
            <div className="app">

                <header className="">
                    <Websocket message={this.bookMessage}>
                    <Container>
                        <Row>
                            <Col sm={8} className="border5 noSidePadding">
                                <div className="headingClass">
                                    <span className="textClass"> Orderbook</span>
                                <OrderBook/>
                                </div>
                            </Col>
                            <Col sm={4} className="border5 noSidePadding noLeftBorder">
                                <div>
                                <Trades/>
                                </div>
                            </Col>

                        </Row>
                    </Container>
                    </Websocket>
                    <p>
                    </p>
                </header>
            </div>
        );
    }
}
