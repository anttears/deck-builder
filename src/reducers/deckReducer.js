import { ADD_CARD_TO_DECK, REMOVE_CARD_FROM_DECK } from '../actions/types';
import { addCard, removeCard } from '../utils/deck';

const initialState = {
    lands: {},
    cards: {}
};

export default (state = initialState, action) => {
    switch(action.type) {
        case ADD_CARD_TO_DECK:
            return {
                ...state,
                cards: addCard(action.payload, state.cards)
            };

        case REMOVE_CARD_FROM_DECK:
            return {
                ...state,
                cards: removeCard(action.payload, state.cards)
            }
        default:
            return state;
    }
}