import { ADD_CARD_TO_DECK, REMOVE_CARD_FROM_DECK } from './types';

export const addCard = (uuid, cardList) => async dispatch => {
    dispatch({
        type: ADD_CARD_TO_DECK,
        payload: { uuid, cardList }
    });
}

export const removeCard = (uuid, cardList) => async dispatch => {
    dispatch({
        type: REMOVE_CARD_FROM_DECK,
        payload: { uuid, cardList }
    });
}