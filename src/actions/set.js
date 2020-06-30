import { SET_NAME } from './types';

export const setName = (setName) => dispatch => {
    dispatch({
        type: SET_NAME,
        payload: setName
    });
}