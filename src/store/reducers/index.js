import {combineReducers} from "redux";
import currentUser from "./currentUser";
import pantryItems from "./pantryItems"
import recipes from "./recipes";
import errors from "./errors";

const rootReducer = combineReducers({
    currentUser,
    pantryItems,
    recipes,
    errors
});

export default rootReducer;