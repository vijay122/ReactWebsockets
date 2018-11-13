import React, { Component } from 'react';
import "./OrderBook.scss";
import {Trades} from "../Trades/Trades";
import {connect} from "react-redux";
import _ from "lodash";
import ActionCreators from "../../redux/actions";

import { Container, Row, Col } from 'react-grid-system';

const OrderBookContext = React.createContext();

const ROW = ({count,price,amount,type}) => {
    let amt = amount? Math.abs(amount).toFixed(2):0;
    let cnt = Math.abs(count);
    let prc = Math.abs(price)? Math.abs(price).toFixed(2):0;
    let total="";
    if(amt && cnt)
    {
        total = (amt *cnt).toFixed(2);
    }
    let textClass = amt>0?" greenText":" redText";
    if(type=="green") {
        return (<div className="row">
            <div>{cnt}</div>
            <div>{total}</div>
            <div className={textClass}>{amt}</div>
            <div>{prc}</div>
        </div>)
    }
    else
    {
        return (<div className="row">
            <div>{prc}</div>
            <div className={textClass}>{amt}</div>
            <div>{total}</div>
            <div>{cnt}</div>
        </div>)
    }
}

/*
  Table component written as an ES6 class
*/
export class OrderBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                greens:new Map(),
                reds:new Map()
            }
        };

        this.compareBy.bind(this);
        this.sortBy.bind(this);
    }

    static getDerivedStateFromProps(newProps, prevState) { // - GDSFS
        if(newProps && newProps.book && prevState &&  prevState.data && prevState.data.greens && newProps.book.greens && newProps.book.greens.size != prevState.data.greens.size)
        {
            return {data:newProps.book};
        }
        return null;
    }


    compareBy(key) {
        return function (a, b) {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        };
    }

    sortBy(key) {
        this.props.dispatch(ActionCreators.disconnectWebsocket());
        let arrayCopy = [...this.state.data];
        arrayCopy.sort(this.compareBy(key));
        this.setState({data:[]},function(){
            this.setState({data: arrayCopy});
        });

    }

    render() {
      let greenRows =[];
      let redRows =[];
      if(this.state.data && this.state.data.greens) {
          if(this.state.data.greens && this.state.data.greens.entries()) {
              for (const k of this.state.data.greens.keys()) {
                  let data = this.state.data.greens.get(k);
                  greenRows.unshift(<ROW type="green" {...data}></ROW>);
              }
          }
      }
      if(this.state.data && this.state.data.reds) {
          if(this.state.data.greens && this.state.data.reds.entries()) {
              for (const k of this.state.data.reds.keys()) {
                  let data = this.state.data.reds.get(k);
                  redRows.unshift(<ROW type="red" {...data}></ROW>);
              }
          }
      }

        return (
            <Row>
                <Col>
            <div className="table">
                <div className="header">
                    <div onClick={() => this.sortBy('count')} >count</div>
                    <div className="" onClick={() => this.sortBy('amount')}>Amount</div>
                    <div onClick={() => this.sortBy('total')}>Total</div>
                    <div onClick={() => this.sortBy('price')}>Price</div>
                </div>
                <div className="body">
                    {greenRows}
                </div>
            </div>
                </Col>
                <Col>
                    <div className="table">
                        <div className="header">
                            <div onClick={() => this.sortBy('price')}>Price</div>
                            <div onClick={() => this.sortBy('total')}>Total</div>
                            <div className="" onClick={() => this.sortBy('amount')}>Amount</div>
                            <div onClick={() => this.sortBy('count')} >count</div>
                        </div>
                        <div className="body">
                            {redRows}
                        </div>
                    </div>
                </Col>
            </Row>
        );

    }
}

function mapStateToProps(state) {
    return {
        book: state.orderBookReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return {  dispatch };
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderBook);
