// authReducer.js

import { LOGIN_SUCCESS } from '../actions/authAction';

const initialState = {
  token: null,
  userData: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userData: action.payload.userData,
      };
    default:
      return state;
  }
};

export default authReducer;
