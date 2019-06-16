import * as BitCoinActions from '../actions/api_actions/bitCoin';
import _ from 'lodash';
// import { REHYDRATE } from 'redux-persist/lib/constants';

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

export const checkIfValueIsPrime = (value) => {
    let isPrime = true;
    for (let i = 2; i <= Math.sqrt(value); i++) {
        if (value % i == 0) {
            isPrime = false;
            break;
        }
    }
    return isPrime && (value > 1);
}

export const derivePrimeNumbers = (bitCoinValues) => {
    if (!_.isEmpty(bitCoinValues))
        return bitCoinValues = Object.keys(bitCoinValues).map(key => {
            return { date: key, value: bitCoinValues[key], isPrime: checkIfValueIsPrime(4) };
        });
}