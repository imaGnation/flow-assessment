import React, { Component } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import _ from 'lodash';

class BitcoinValues extends Component {

    render = () => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });

        return (
            <Card className="Bitcoin-values-card">
                <Typography className="Bitcoin-values-card-header">Bitcoin Daily Values</Typography>
                <div className="Bitcoin-values-container-header col-md-12">
                    <div className="col-md-4">
                        <Typography className="Bitcoin-values-item-headers">Date</Typography>
                    </div>
                    <div className="col-md-4">
                        <Typography className="Bitcoin-values-item-headers">Value</Typography>
                    </div>
                    <div className="col-md-4">
                        <Typography className="Bitcoin-values-item-headers">Is a Prime Number</Typography>
                    </div>
                </div>
                <CardContent className="Bitcoin-values-card-content">
                    {!_.isEmpty(this.props.bitcoinValues) ? this.props.bitcoinValues.map(bitcoinValue => {
                        console.info(bitcoinValue)
                        return <div className="Bitcoin-values-container" key={bitcoinValue.date}>
                            <div className="col-md-4">{bitcoinValue.date}</div>
                            <div className="col-md-4">{formatter.format(bitcoinValue.value)}</div>
                            <div style={{ backgroundColor: bitcoinValue.isPrime ? 'green' : 'white' }} className="col-md-4">{bitcoinValue.isPrime.toString()}</div>
                        </div>
                    }) : <div></div>}
                </CardContent>
            </Card>
        );
    }
}

export default BitcoinValues;