import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from "react-redux";
import Dashboard from "./containers/Dashboard/Dashboard";
import store, { history } from "./store";

class App extends Component {
  render() {
    return (
        <Provider store={store}>
      <div className="App">
       <Dashboard />
      </div>
        </Provider>
    );
  }
}

export default App;
