import { Fragment } from "react";
import { useSelector } from "react-redux";
import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../store/categories/category.selector.js";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap); // transforms category array into obj
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((objTitle) => {
          const products = categoriesMap[objTitle];
          return (
            <CategoryPreview
              key={objTitle}
              title={objTitle}
              products={products}
            />
          );
        })
      )}
    </Fragment>
  );
};
export default CategoriesPreview;
