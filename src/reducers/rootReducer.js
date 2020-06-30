import { combineReducers } from 'redux';

import setReducer from './setReducer';
import cardReducer from './cardReducer';
import deckReducer from './deckReducer';

export default combineReducers({
    sets: setReducer,
    cards: cardReducer,
    deck: deckReducer
});
