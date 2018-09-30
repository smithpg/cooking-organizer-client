import apiCall from "../../services/api";
import {
  SET_CURRENT_USER,
  SET_PANTRY_ITEMS,
  SET_RECIPES
} from "../actionTypes";
import { removeError, addError } from "./error";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return dispatch => {
    localStorage.clear();
    dispatch(setCurrentUser({}));
    dispatch({
      type: SET_PANTRY_ITEMS,
      items: []
    });
    dispatch({
      type: SET_RECIPES,
      items: []
    });
  };
}

/**
 *  Function Name: authUser
 *
 *  Description: Handles auth for signin and signup
 *
 */

export function authUser(type, userData) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      return apiCall("post", `/auth/${type}`, userData)
        .then(({ token, ...user }) => {
          localStorage.setItem("jwtToken", token);
          console.log("About to create user action w/ following user param:");
          console.log(user);
          dispatch(removeError());
          dispatch(setCurrentUser(user));
          resolve(user);
        })
        .catch(err => {
          dispatch(addError(err.message));
        });
    });
  };
}
