import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES, Category } from "./category.types";
import { getCategoriesAndDocs } from "../../utils/firebase/firebase.utils";

// =>
// => typed action
export type FetchCategoriesStart =
  Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;
// => typed action
export type FetchCategoriesSuccess = ActionWithPayload<
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
  Category[]
>;
// => typed action
export type FetchCategoriesFailed = ActionWithPayload<
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
  Error
>;

// Union
export type CategoryAction =
  | FetchCategoriesStart
  | FetchCategoriesSuccess
  | FetchCategoriesFailed;

// =>  ACTION CREATORS:
// withMatcher function enhancement allows to perform type checking and action matching based on the action type
export const fetchCategoriesStart = withMatcher(
  (): FetchCategoriesStart =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)
);

// withMatcher function enhancement allows to perform type checking and action matching based on the action type
export const fetchCategoriesSuccess = withMatcher(
  (categoriesArr: Category[]): FetchCategoriesSuccess =>
    createAction(
      CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
      categoriesArr
    )
);

// withMatcher function enhancement allows to perform type checking and action matching based on the action type
export const fetchCategoriesFailed = withMatcher(
  (error: Error): FetchCategoriesFailed =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)
);
