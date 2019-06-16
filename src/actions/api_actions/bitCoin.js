import { CALL_API } from '../../middleware/api';

export const GET_BITCOIN_DAILY_VALUES_REQUEST = 'GET_BITCOIN_DAILY_VALUES_REQUEST';
export const GET_BITCOIN_DAILY_VALUES_SUCCESS = 'GET_BITCOIN_DAILY_VALUES_SUCCESS';
export const GET_BITCOIN_DAILY_VALUES_FAILURE = 'GET_BITCOIN_DAILY_VALUES_FAILURE';

export const retrieveDailyValues = (payload) => {
    return {
        [CALL_API]: {
            types: [GET_BITCOIN_DAILY_VALUES_REQUEST, GET_BITCOIN_DAILY_VALUES_SUCCESS, GET_BITCOIN_DAILY_VALUES_FAILURE],
            endpoint: `https://api.coindesk.com/v1/bpi/historical/close.json?start=${payload.startDate}&end=${payload.endDate}`,
            httpMethod: 'GET'
        }
    }
}
