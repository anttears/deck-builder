import { FETCH_SETS, FETCH_CARDS } from './types';

// TODO look into caching responses

export const fetchSets = () => async dispatch => {
    const response = await fetch('https://localhost:9191/api/set-list');
    const sets = await response.json();
    dispatch({
        type: FETCH_SETS,
        payload: sets
    });
}

export const fetchCards = (setName) => async dispatch => {
    const response = await fetch(`https://localhost:9191/api/card-list/${setName}`);
    const cards = await response.json();
    dispatch({
        type: FETCH_CARDS,
        payload: cards
    });
}