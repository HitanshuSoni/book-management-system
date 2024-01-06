
// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

// Action Creators
export const loginSuccess = (token, userData) => ({
  type: LOGIN_SUCCESS,
  payload: { token, userData },
});
