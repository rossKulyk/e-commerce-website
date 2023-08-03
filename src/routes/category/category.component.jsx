import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import ProductCard from "../../components/product-card/product-card.component";
import "./category.styles.scss";

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector((state) => state.categories.categoriesMap);
  // console.log("Category categoriesMap:", categoriesMap);

  const [products, setProducts] = useState(categoriesMap[category]);

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
