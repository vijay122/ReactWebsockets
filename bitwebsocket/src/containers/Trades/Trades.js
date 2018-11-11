import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React from "react";
import "react-tabs/style/react-tabs.css";
import TradeTabs from './TradeTabs';
import {WebSocket} from "../../components/Websocket/Websocket";
import {connect} from "react-redux";


/*
  Table component written as an ES6 class
*/
export class Trades extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {id: 403, title: 'Task 403', priority: 'High', type: 'Improvement', complete: 100},
                {id: 532, title: 'Task 532', priority: 'Medium', type: 'Improvement', complete: 30},
                {id: 240, title: 'Task 240', priority: 'High', type: 'Story', complete: 66},
            ],
        };

    }
    render(){
        let st = this.state;
       return <TradeTabs/>
    }
}

function mapStateToProps(state) {
    return {
        trades: state.tradesReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return {  dispatch };
}


export default connect(mapStateToProps, mapDispatchToProps)(Trades);



