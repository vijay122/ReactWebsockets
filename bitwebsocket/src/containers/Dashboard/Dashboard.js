
import Websocket from "../../components/Websocket/Websocket";

import React, { Component } from 'react';
import OrderBook from "../../components/OrderBook/OrderBook";
import Trades from "../../components/Trades/Trades";
//import logo from './logo.svg';
import './Dashboard.scss';
import { Container, Row, Col } from 'react-grid-system';

export default class Dashboard extends Component {
    render() {
        return (
            <div className="app">
                <header className="">
                    <Container>
                        <Row>
                            <Col sm={8} className="border5 noSidePadding">
                                <Websocket/>
                                <div>
                                    <label>orderbook</label>
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
                    <p>
                    </p>
                </header>
            </div>
        );
    }
}
