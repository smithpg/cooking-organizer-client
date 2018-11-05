import {
  FETCH_FAILURE,
  FETCH_RECIPES,
  SET_RECIPES,
  NEW_RECIPE,
  ADD_RECIPE,
  REMOVE_RECIPE,
  EXPAND_RECIPE,
  RETURN_TO_LIST_VIEW,
  UPDATE_RECIPE,
  EDIT_RECIPE,
  FINISH_EDIT
} from "../actionTypes";

const DEFAULT_STATE = {
  fetching: false,
  items: [],
  recipeInFocus: null,
  recipePaneView: "LIST"
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_RECIPES:
      return {
        ...state,
        fetching: true
      };

    case FETCH_FAILURE:
      return {
        ...state,
        fetching: false
      };

    case SET_RECIPES:
      return {
        ...state,
        fetching: false,
        items: [...action.items]
      };

    case NEW_RECIPE:
      return {
        ...state,
        recipeInFocus: null,
        recipePaneView: "NEW_RECIPE"
      };

    case ADD_RECIPE:
      return {
        ...state,
        items: [...state.items, action.item]
      };

    case REMOVE_RECIPE:
      return {
        ...state,
        recipePaneView: "LIST",
        recipeInFocus: null,
        items: state.items.filter(item => item.id != action.itemId)
      };

    case EXPAND_RECIPE:
      return {
        ...state,
        recipePaneView: "EXPANDED",
        recipeInFocus: action.itemId
      };

    case RETURN_TO_LIST_VIEW:
      return {
        ...state,
        recipePaneView: "LIST",
        recipeInFocus: null
      };

    case EDIT_RECIPE:
      return {
        ...state,
        recipePaneView: "EDIT"
      };

    case FINISH_EDIT:
      return {
        ...state,
        recipePaneView: "EXPANDED"
      };

    case UPDATE_RECIPE:
      return {
        ...state,
        items: state.items.map(
          item =>
            item.id === action.itemId ? { ...item, ...action.update } : item
        )
      };

    default:
      return state;
  }
};
