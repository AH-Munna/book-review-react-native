import { navigate } from '../components/myNavigationRoot.js';
import * as actTypes from './ActionType.js';

const INITIAL_STATE = {
    books: null,
    auth: {
        isAuth: false,
        token: null,
        userId: null,
        email: null,
    },
    reviews: null,
}

export const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actTypes.LOAD_BOOKS:
            return {
                ...state,
                books: action.payload,
            }
        case actTypes.AUTHENTICATED:
            return {
                ...state,
                auth: {
                    isAuth: true,
                    token: action.payload.token,
                    userId: action.payload.userId,
                    email: action.payload.email
                }
            }
        case actTypes.LOGOUT_USER:
            return {
                ...state,
                auth: {
                    isAuth: false,
                    token: null,
                    userId: null,
                    email: null,
                }
            }
        case actTypes.LOAD_REVIEW:
            return {
                ...state,
                reviews: action.payload,
            }
        case actTypes.ADD_REVIEW:
            return {
                ...state,
                reviews: {
                    ...state.reviews,
                    [action.payload.key]: action.payload.reviewObj,
                }
            }
        default:
            return state;
    }
}