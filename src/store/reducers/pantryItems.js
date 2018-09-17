import {
  FETCH_FAILURE,
  FETCH_PANTRY_ITEMS,
  SET_PANTRY_ITEMS,
  ADD_PANTRY_ITEM,
  REMOVE_PANTRY_ITEM,
  HIGHLIGHT_ITEMS
} from "../actionTypes";

const DEFAULT_STATE = {
  fetching: false,
  highlighted: [],
  items: []
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_PANTRY_ITEMS:
      return {
        ...state,
        fetching: true
      };

    case FETCH_FAILURE:
      return {
        ...state,
        fetching: false
      };

    case SET_PANTRY_ITEMS:
      return {
        fetching: false,
        items: [...action.items]
      };

    case ADD_PANTRY_ITEM:
      return {
        ...state,
        items: [...state.items, action.item]
      };

    case REMOVE_PANTRY_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id != action.itemId)
      };

    case HIGHLIGHT_ITEMS:
      return {
        ...state,
        highlighted: state.items.filter(item =>
          action.ingredients.includes(item)
        )
      };

    default:
      return state;
  }
};
