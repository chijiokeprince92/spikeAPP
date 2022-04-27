import { FETCH_ALL_USERS,  FETCH_USER, } from '../constants/actionTypes';


export default (state = { user: [] }, action) => {
    switch (action.type) {
      case FETCH_ALL_USERS:
        return {...state, user: action.payload.data };
      case FETCH_USER:
        return { ...state, user: action.payload.user };
      default:
        return state;
    }
  };