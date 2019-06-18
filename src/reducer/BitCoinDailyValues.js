import * as BitCoinActions from '../actions/api_actions/bitCoin';
import _ from 'lodash';

const initialState = {};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {

        case BitCoinActions.GET_BITCOIN_DAILY_VALUES_REQUEST:
            return {
                ...state,
                error: undefined
            }

        case BitCoinActions.GET_BITCOIN_DAILY_VALUES_SUCCESS:
            return {
                ...state,
                error: undefined,
                dailyValues: derivePrimeNumbers(action.response.json.bpi)
            }

        case BitCoinActions.GET_BITCOIN_DAILY_VALUES_FAILURE:
            return {
                ...state,
                error: action.error
            }

        default:
            return state;
    }
}

/// check if value is a prime number
export const checkIfValueIsPrime = (value) => {
    let isPrime = true;
    for (let i = 2; i <= Math.sqrt(value); i++) {
        if (Math.floor(value) % i === 0) {
            isPrime = false;
            break;
        }
    }
    return isPrime && (value > 1);
}

/// retrieve derived bitcoin values
export const derivePrimeNumbers = (bitCoinValues) => {
    if (!_.isEmpty(bitCoinValues))
        return bitCoinValues = Object.keys(bitCoinValues).map(key => {

            const tempValue = Math.round(bitCoinValues[key] * 100) / 100; // round off to two decimal places
            const isPrime = checkIfValueIsPrime(tempValue) // derive isPrime value
            const bitCoinValue = isPrime ? Math.floor(tempValue) : tempValue; // derive bitcoin value

            return { date: key, value: bitCoinValue, isPrime: isPrime }; // return new object with isPrime flag
        });
}