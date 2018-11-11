import React from "react";
import "./TradeTabs.scss";


 class Tabs extends React.Component {
    displayName= 'Tabs';
    constructor(props) {
        super(props);
        this.state={
            selected: this.props.selected
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.props !== nextProps || this.state !== nextState;
    }
    handleClick (index, event) {
        event.preventDefault();
        this.setState({
            selected: index
        });
    }
    _renderTitles () {
        function labels(child, index) {
            var activeClass = (this.state.selected === index ? 'active' : '');
            return (
                <li key={index}>
                    <a href="#"
                       className={activeClass}
                       onClick={this.handleClick.bind(this, index)}>
                        {child.props.label}
                    </a>
                </li>
            );
        }
        return (
            <ul className="tabs__labels">
                <label className="leftTitle">Trades</label>
                {this.props.children.map(labels.bind(this))}
            </ul>
        );
    }
    _renderContent () {
        return (
            <div className="tabs__content">
                {this.props.children[this.state.selected]}
            </div>
        );
    }
    render () {
        return (
            <div className="tabs">
                {this._renderTitles()}
                {this._renderContent()}
            </div>
        );
    }
}

 class Pane extends React.Component {
    displayName= 'Pane';
    constructor(props) {
        super(props);
        this.state={
            selected: this.props.selected
        }
    }

    render () {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default class TradeTabs extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Tabs selected={0}>
                    <Pane label="Market">
                        <div>This is my tab 1 contents!</div>
                    </Pane>
                    <Pane label="Yours">
                        <div>This is my tab 2 contents!</div>
                    </Pane>
                </Tabs>
            </div>
        );
    }
};
