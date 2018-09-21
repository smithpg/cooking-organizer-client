import {
  FETCH_FAILURE,
  FETCH_RECIPES,
  SET_RECIPES,
  ADD_RECIPE,
  REMOVE_RECIPE,
  HOVER_RECIPE,
  UPDATE_RECIPE,
  EDIT_RECIPE,
  FINISH_EDIT
} from "../actionTypes";

const DEFAULT_STATE = {
  fetching: false,
  hovered: null,
  items: []
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

    case ADD_RECIPE:
      return {
        ...state,
        items: [...state.items, action.item]
      };

    case REMOVE_RECIPE:
      return {
        ...state,
        items: state.items.filter(item => item.id != action.itemId)
      };

    case HOVER_RECIPE:
      return {
        ...state,
        hovered: action.itemId
      };

    case EDIT_RECIPE:
      return {
        ...state,
        items: state.items.map(
          item =>
            item.id === action.itemId ? { ...item, editing: true } : item
        )
      };

    case UPDATE_RECIPE:
      return {
        ...state,
        items: state.items.map(
          item =>
            item.id === action.itemId
              ? { ...item, ...action.update, editing: false }
              : item
        )
      };

    default:
      return state;
  }
};
