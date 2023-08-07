import { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector.js";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap); // transforms category array into obj
  // console.log("CategoriesPreview categoriesMap:", categoriesMap);

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
