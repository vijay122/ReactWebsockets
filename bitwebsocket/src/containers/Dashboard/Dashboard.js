
import Websocket from "../../components/Websocket/Websocket";

import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';

export default class Dashboard extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        <Websocket/>
                    </p>
                </header>
            </div>
        );
    }
}
