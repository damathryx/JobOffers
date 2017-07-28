import * as Action from '../constants/actionTypes';

export const initialState = {
    loading: false,
    loggedIn: false,
    hasInternet: true,
};

export const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case Action.LOGIN: {
            return Object.assign({}, state, {
                loggedIn: true,
            });
        }
    }
}