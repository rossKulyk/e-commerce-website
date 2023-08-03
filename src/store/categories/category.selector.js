// selector transform logic daya into the final output
export const selectCategoriesMap = (state) => {
  return state.categories.categories.reduce((acc, category) => {
    console.log("===> selectCategoriesMap MAP category:", category);

    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
};
