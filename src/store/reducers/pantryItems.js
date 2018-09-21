import {
  FETCH_FAILURE,
  FETCH_PANTRY_ITEMS,
  SET_PANTRY_ITEMS,
  ADD_PANTRY_ITEM,
  REMOVE_PANTRY_ITEM,
  HIGHLIGHT_ITEMS,
  REMOVE_HIGHLIGHTS
} from "../actionTypes";

const DEFAULT_STATE = {
  fetching: false,
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
      if (action.ingredients) {
        const uppercaseIngredients = action.ingredients.map(ingredient =>
          ingredient.toUpperCase()
        );
        return {
          ...state,
          items: state.items.map(item => {
            if (
              uppercaseIngredients.some(
                ingredient => ingredient === item.name.toUpperCase()
              )
            ) {
              return { ...item, highlighted: true };
            } else return { ...item, highlighted: false };
          })
        };
      } else {
        return {
          ...state,
          items: state.items.map(item => ({ ...item, highlighted: false }))
        };
      }

    case REMOVE_HIGHLIGHTS:
      return {
        ...state,
        items: state.items.map(item => ({ ...item, highlighted: false }))
      };

    default:
      return state;
  }
};
