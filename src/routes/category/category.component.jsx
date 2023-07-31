import { useContext, useState, useEffect, Fragment } from "react";
import { useParams } from "react-router";
import { CategoriesContext } from "../../contexts/context";
import ProductCard from "../../components/product-card/product-card.component";
import "./category.styles.scss";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);
  // console.log("category:", category);
  // console.log(
  //   "categoriesMap:",
  //   categoriesMap,
  //   ". categoriesMap[category]:",
  //   categoriesMap[category]
  // );
  // console.log("products:", products);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className="category-container-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </div>
    </Fragment>
  );
};
export default Category;
