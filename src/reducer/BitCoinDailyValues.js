import * as BitCoinActions from '../actions/api_actions/bitCoin';
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
                dailyValues: action.response.json.bpi
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