import { ADD_CARD_TO_DECK, REMOVE_CARD_FROM_DECK } from '../actions/types';
import { addCard } from '../utils/deck';

const initialState = {
    lands: {},
    cards: {}
};

export default (state = initialState, action) => {
    switch(action.type) {
        case ADD_CARD_TO_DECK:
            return {
                ...state,
                cards: {
                    ...state.cards,
                    [action.payload.uuid]: addCard(action.payload, state.cards)
                }
            };
        default:
            return state;
    }
}