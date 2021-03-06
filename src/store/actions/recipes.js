/**
 * This file contains actions for creating, and deleting recipes items
 */
import {
  FETCH_RECIPES,
  FETCH_FAILURE,
  SET_RECIPES,
  ADD_RECIPE,
  REMOVE_RECIPE,
  EXPAND_RECIPE,
  RETURN_TO_LIST_VIEW,
  UPDATE_RECIPE,
  EDIT_RECIPE,
  FINISH_EDIT,
  NEW_RECIPE
} from "../actionTypes";

import apiCall from "../../services/api";
import { addError, removeError } from "./error";

function normalizeRecipe(recipe) {
  return {
    title: recipe.title,
    ingredients: recipe.ingredients,
    id: recipe._id
  };
}

export function deleteRecipe(userId, itemId) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      return apiCall("delete", `/users/${userId}/recipes/${itemId}`)
        .then(() => {
          dispatch(removeError());
          dispatch({
            type: REMOVE_RECIPE,
            itemId
          });
          resolve("Item deleted successfully.");
        })
        .catch(err => {
          dispatch(addError(err.message));
        });
    });
  };
}

export function createRecipe(userId, item) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      return apiCall("post", `/users/${userId}/recipes`, item)
        .then(returnedItem => {
          dispatch(removeError());
          dispatch({
            type: ADD_RECIPE,
            item: normalizeRecipe(returnedItem)
          });
          resolve(returnedItem);
        })
        .catch(err => {
          dispatch(addError(err.message));
        });
    });
  };
}

export function fetchRecipes(userId) {
  console.log("In fetchRecipes, userId = ", userId);
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: FETCH_RECIPES });

      return apiCall("get", `/users/${userId}/recipes`)
        .then(returnedItems => {
          const recipes = returnedItems.map(normalizeRecipe);

          dispatch(removeError());
          dispatch({
            type: SET_RECIPES,
            items: recipes
          });
          resolve(returnedItems);
        })
        .catch(err => {
          dispatch(addError(err.message));
          dispatch({ type: FETCH_FAILURE });
        });
    });
  };
}

export function newRecipe() {
  return {
    type: NEW_RECIPE
  };
}

export function expandRecipe(itemId) {
  return {
    type: EXPAND_RECIPE,
    itemId
  };
}

export function returnToListView() {
  return {
    type: RETURN_TO_LIST_VIEW
  };
}

export function editRecipe(itemId) {
  return {
    type: EDIT_RECIPE,
    itemId
  };
}

export function finishEdit() {
  return {
    type: FINISH_EDIT
  };
}

export function updateRecipe(userId, itemId, update) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      return apiCall("put", `/users/${userId}/recipes/${itemId}`, update)
        .then(res => {
          dispatch(removeError());
          dispatch({
            type: UPDATE_RECIPE,
            itemId,
            update
          });
          dispatch({
            type: FINISH_EDIT
          });
          resolve(res);
        })
        .catch(err => {
          dispatch(addError(err.message));
        });
    });
  };
}
