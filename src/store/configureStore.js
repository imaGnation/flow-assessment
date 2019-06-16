import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import * as BitCoinDailyValues from '../reducer/BitCoinDailyValues';
import api from '../middleware/api';
import { connectRouter, routerMiddleware } from 'connected-react-router'

export default function configureStore(history, initialState) {
    const reducers = {
        bitcoin: BitCoinDailyValues.reducer
    };

    const middleware = [
        thunk,
        routerMiddleware(history),
        api
    ];

    const persistConfig = {
        key: 'flow-rent-assessment',
        storage,
    }

    // In development, use the browser's Redux dev tools extension if installed
    const enhancers = [];
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
        enhancers.push(window.devToolsExtension());
    }

    const rootReducer = combineReducers({
        ...reducers,
        router: connectRouter(history)
    });

    const persistedReducer = persistReducer(persistConfig, rootReducer)

    return createStore(
        persistedReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );
}

