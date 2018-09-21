/**
 * This file contains actions for creating, and deleting pantry items
 */
import {
  SET_PANTRY_ITEMS,
  ADD_PANTRY_ITEM,
  REMOVE_PANTRY_ITEM,
  HIGHLIGHT_ITEMS,
  REMOVE_HIGHLIGHTS,
  FETCH_PANTRY_ITEMS,
  FETCH_FAILURE
} from "../actionTypes";

import apiCall from "../../services/api";
import { addError, removeError } from "./error";

function normalizeItem(item) {
  console.log(item);
  return {
    name: item.name,
    quantity: item.quantity,
    id: item._id,
    highlighted: false
  };
}

export function deletePantryItem(userId, itemId) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      return apiCall("delete", `/users/${userId}/pantry/${itemId}`)
        .then(() => {
          dispatch(removeError());
          dispatch({ type: REMOVE_PANTRY_ITEM, itemId });
          resolve("Item deleted successfully.");
        })
        .catch(err => {
          dispatch(addError(err.message));
        });
    });
  };
}

export function createPantryItem(userId, item) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      return apiCall("post", `/users/${userId}/pantry`, item)
        .then(returnedItem => {
          dispatch(removeError());
          dispatch({
            type: ADD_PANTRY_ITEM,
            item: normalizeItem(returnedItem)
          });
          resolve(returnedItem);
        })
        .catch(err => {
          dispatch(addError(err.message));
        });
    });
  };
}

export function fetchPantryItems(userId) {
  console.log("In fetchPantryItems, userId = ", userId);
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: FETCH_PANTRY_ITEMS });

      return apiCall("get", `/users/${userId}/pantry`)
        .then(returnedItems => {
          const items = returnedItems.map(item => normalizeItem(item));

          dispatch(removeError());
          dispatch({
            type: SET_PANTRY_ITEMS,
            items: items
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

export function highlightMatchingPantryItems(ingredients) {
  return {
    ingredients,
    type: HIGHLIGHT_ITEMS,
    meta: {
      debounce: {
        time: 400,
        // The action will be dispatched at the beginning of the debounce and not at the end
        leading: false,
        trailing: true
      }
    }
  };
}
export function removeHighlights(ingredients) {
  return { type: REMOVE_HIGHLIGHTS };
}
