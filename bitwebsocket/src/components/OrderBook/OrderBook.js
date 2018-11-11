import React, { Component } from 'react';
import "./OrderBook.scss";

const Row = ({count, amount, total, price, price1,total1,amount1,count1}) => (
    <div className="row">
        <div>{count}</div>
        <div>{amount}</div>
        <div>{total}</div>
        <div>{price}</div>
        <div>{price1}</div>
        <div>{total1}</div>
        <div>{amount1}</div>
        <div>{count1}</div>
    </div>
);

/*
  Table component written as an ES6 class
*/
export default class OrderBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {count : 43, amount: 1.1222, total: 'High', price:  1.1222, price1: 100, total1:233, amount1:1, count1:1},
                {count : 303, amount:  1.1222, total: 'High', price:  1.1222, price1: 100, total1:233, amount1:1, count1:1},
                {count : 703, amount:  1.1222, total: 'High', price:  1.1222, price1: 100, total1:233, amount1:1, count1:1},
                {count : 453, amount:  1.1222, total: 'High', price:  1.1222, price1: 140, total1:233, amount1:1, count1:1},
                {count : 73, amount:  1.1222, total: 'High', price:  1.1222, price1: 100, total1:233, amount1:1, count1:1},
                {count : 4037, amount:  1.1222, total: 'High', price:  1.1222, price1: 110, total1:233, amount1:1, count1:1},
                {count : 1033, amount:  1.1222, total: 'High', price:  1.1222, price1: 100, total1:233, amount1:1, count1:1},
                {count : 463, amount:  1.1222, total: 'High', price:  1.1222, price1: 100, total1:233, amount1:1, count1:1},
                {count : 4037, amount:  1.1222, total: 'High', price:  1.1222, price1: 100, total1:233, amount1:1, count1:1},



            ],
        };

        // http://reactkungfu.com/2015/07/why-and-how-to-bind-methods-in-your-react-component-classes/
        // bind the context for compareBy & sortBy to this component instance
        this.compareBy.bind(this);
        this.sortBy.bind(this);
    }

    compareBy(key) {
        return function (a, b) {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        };
    }

    sortBy(key) {
        let arrayCopy = [...this.state.data];
        arrayCopy.sort(this.compareBy(key));
        this.setState({data: arrayCopy});
    }

    render() {
        const rows = this.state.data.map( (rowData) => <Row {...rowData} />);

        return (
            <div className="table">
                <div className="header">
                    <div onClick={() => this.sortBy('count')} >count</div>
                    <div onClick={() => this.sortBy('amount')}>Amount</div>
                    <div onClick={() => this.sortBy('total')}>Total</div>
                    <div onClick={() => this.sortBy('price')}>Price</div>
                    <div onClick={() => this.sortBy('price1')}>Price</div>
                    <div onClick={() => this.sortBy('total1')} >total</div>
                    <div onClick={() => this.sortBy('amount1')}>Amount</div>
                    <div onClick={() => this.sortBy('count1')}>count</div>
                </div>
                <div className="body">
                    {rows}
                </div>
            </div>
        );

    }
}
