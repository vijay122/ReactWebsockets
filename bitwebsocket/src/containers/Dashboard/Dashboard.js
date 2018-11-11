
import Websocket from "../../components/Websocket/Websocket";

import React, { Component } from 'react';
import OrderBook from "../../components/OrderBook/OrderBook";
//import logo from './logo.svg';
//import './App.css';

export default class Dashboard extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        <Websocket/>
                        <OrderBook/>
                    </p>
                </header>
            </div>
        );
    }
}
