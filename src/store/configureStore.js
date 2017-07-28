import { createStore, applyMiddleware } from 'redux';
import { reducer, initialState } from './Reducer';

export default function configureStore(initialState) {
    return createStore(
        reducer,
        initialState,
    );
}
