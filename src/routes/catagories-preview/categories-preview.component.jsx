import { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector.js";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  // console.log(" CategoriesPreview FINAL categoriesMap:", categoriesMap);
  const categoriesMap = useSelector(selectCategoriesMap);
  // const categoriesMap = useSelector((state) => state.categories.categories);
  console.log("CategoriesPreview categoriesMap:", categoriesMap);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((objTitle) => {
        const products = categoriesMap[objTitle];
        return (
          <CategoryPreview
            key={objTitle}
            title={objTitle}
            products={products}
          />
        );
      })}
    </Fragment>
  );
};
export default CategoriesPreview;
