import { CATEGORIES_ACTION_TYPES, Category } from "./category.types";
import { CategoryAction } from "./category.action";

// typed initial state
export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};
const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null, // tracks error state for async fetching
};

// reducer should store the most basic data format
//  action = {} as CategoryAction => discriminating union
export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {} as CategoryAction
) => {
  // const { type, payload } = action;
  // console.log("> REDUCER_CATEGORY action:", action);

  switch (action.type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true,
      };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, isLoading: false, categories: action.payload };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
