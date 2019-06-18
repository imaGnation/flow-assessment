import React, { Component } from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';

class DatePicker extends Component {
    render = () => {

        const minDate = () => {
            return this.props.isEndDate ? moment(this.props.startDate) : moment().add('M', -6); // derive end date minDate
        }

        const maxDate = () => {
            return moment();
        }

        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    id={this.props.id}
                    label={this.props.label}
                    value={this.props.value}
                    minDate={minDate()}
                    maxDate={maxDate()}
                    className="Period-container"
                    onChange={(value) => this.props.onDateChange(value)} />
            </MuiPickersUtilsProvider>
        );
    }
}

export default DatePicker;