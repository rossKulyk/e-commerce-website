import { createSelector } from "reselect"; // generates memoized selector functions

const selectCategoryReducer = (state) => {
  return state.categories;
};

// re-runs only if state.categories have changed
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesArr) => {
    return categoriesArr.categories;
  }
);

// selector transforms logic data into the final output
// output will only be recalculated when the values have changed
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categories) => {
    return categories.isLoading;
  }
);
