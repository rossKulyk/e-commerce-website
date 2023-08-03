import { Fragment } from "react";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  const categoriesMap = useSelector((state) => state.categories.categoriesMap);
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
