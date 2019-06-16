import React, { Component } from 'react';
import logo from './assets/bitcoin-image.png';
import './App.scss';
import DatePicker from './components/DatePicker';
import moment from 'moment';

class App extends Component {

  constructor(props, state) {
    super(props, state);

    this.state = {
      startDate: moment().add('M', -6),
      endDate: moment()
    }
  }

  onStardDateChange = (value) => {
    this.setState({ startDate: value });
  }

  onEndDateChange = (value) => {
    this.setState({ endDate: value });
  }

  render = () => {
    return (<div className="App" >
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="Period-Container">
        <DatePicker label="Start Date" value={this.state.startDate} onDateChange={(value) => this.onStardDateChange(value)} />
        <DatePicker label="End Date" startDate={this.state.startDate} value={this.state.endDate} isEndDate={true} onDateChange={(value) => this.onEndDateChange(value)} />
      </div>
    </div>);
  }
}

export default App;
