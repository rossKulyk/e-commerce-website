import { CATEGORIES_ACTION_TYPES } from "./category.types";
//
const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null, // tracks error state for async fetching
};

// reducer should store the most basic data frmat
export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action;
  // console.log("> REDUCER_CATEGORY action:", action);

  switch (type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true,
      };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, isLoading: false, categories: payload };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};
