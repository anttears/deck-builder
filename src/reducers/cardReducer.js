import { FETCH_CARDS } from '../actions/types';
import cardSort from '../utils/cardSort';

const initialState = {
    sortedCards: {},
    cardList: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_CARDS:
            return {
                ...state,
                sortedCards: cardSort(action.payload),
                cardList: action.payload
            };
        default:
            return state;
    }
}