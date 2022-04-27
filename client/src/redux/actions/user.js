import { FETCH_ALL_USERS, FETCH_USER, START_LOADING, END_LOADING, } from '../constants/actionTypes';
import * as api from '../../api/index.js';

export const getProfile = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.getUser(id);

    dispatch({ type: FETCH_USER, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = () => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data: { data } } = await api.getAllUsers();
  
      dispatch({ type: FETCH_ALL_USERS, payload: { data } });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };