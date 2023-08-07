import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./category.types";

// categories action creator
export const setCategories = (categoriesArr) => {
  return createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArr);
};
