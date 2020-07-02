import { FETCH_SETS, SET_NAME } from '../actions/types';

const initialState = {
    setList: [],
    currentSetName: ''
};

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_SETS:
            return {
                ...state,
                setList: action.payload
            };
        case SET_NAME: 
        return {
            ...state,
            currentSetName: action.payload
        }
        default:
            return state;
    }
}