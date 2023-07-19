import { useContext, Fragment } from "react";
import { CategoriesContext } from "../../contexts/context";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  console.log("CategoriesPreview categoriesMap:", categoriesMap);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((objTitle) => {
        const products = categoriesMap[objTitle];
        console.log("CategoriesPreview products:", products);
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
