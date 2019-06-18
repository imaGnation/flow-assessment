import React, { Component } from 'react';
import logo from '../assets/bitcoin-image.png';
import DatePicker from '../components/DatePicker';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import { retrieveDailyValues } from '../actions/api_actions/bitCoin';
import BitcoinValues from './BitcoinValues';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

const FORMAT_DATE_FORMAT = 'YYYY-MM-DD';

class Home extends Component {
    constructor(props, state) {
        super(props, state);

        this.state = {
            startDate: moment().add(-6, 'M'),
            endDate: moment()
        }
    }

    componentDidMount = () => {
        this.retrieveBitcoinValues();
    }

    componentDidUpdate = () => {
        // todo: check for duplicate values
        //const t = this.props.bitcoin.reduce((b, c) => ((b[b.findIndex(d => d.el === c)] || b[b.push({ el: c, count: 0 }) - 1]).count++ , b), []);

    }

    retrieveBitcoinValues = () => {
        this.props.retrieveDailyValues({
            startDate: moment(this.state.startDate).format(FORMAT_DATE_FORMAT),
            endDate: moment(this.state.endDate).format(FORMAT_DATE_FORMAT)
        });
    }

    onStardDateChange = (value) => {
        this.setState({ startDate: value });
    }

    onEndDateChange = (value) => {
        this.setState({ endDate: value });
    }

    retrieveDailyValues = (event) => {
        event.preventDefault();
        this.retrieveBitcoinValues();
    }

    render = () => {
        return (<div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
            <div>
                <DatePicker label="Start Date" value={this.state.startDate} onDateChange={(value) => this.onStardDateChange(value)} id="dtPickerStartDate" />
                <DatePicker label="End Date" startDate={this.state.startDate} value={this.state.endDate} isEndDate={true} onDateChange={(value) => this.onEndDateChange(value)} id="dtPickerEndDate" />
                <Button onClick={this.retrieveDailyValues.bind(this)} id="btnFilterDates" className="Filter-button">Filter</Button>
            </div>
            <BitcoinValues bitcoinValues={this.props.bitcoin} />
        </div>);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        bitcoin: !_.isEmpty(state.bitcoin) && !_.isEmpty(state.bitcoin.dailyValues) ? state.bitcoin.dailyValues : []
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        retrieveDailyValues
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)