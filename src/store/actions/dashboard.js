/**
 * This file contains the action for fetching the data that will be displayed 
 * in the 'dashboard' view. If the user 
 */
import {SET_PANTRY_ITEMS, SET_RECIPES} from "../actionTypes";

export function fetchDashboardData(itemId, userId){
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall("get", `/users/${userId}/pantry/${itemId}`)
                .then(() => {
                    dispatch(removeError());
                    dispatch(addPantryItem(returnedItem));
                    resolve(returnedItem);
                })
                .catch(err => {
                    dispatch(addError(err.message));
                })
        })
    }
}