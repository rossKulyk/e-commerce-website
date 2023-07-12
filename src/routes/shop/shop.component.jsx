import { useContext } from "react";
import { ProductsContext } from "../../contexts/context";
import ProductCard from "../../components/product-card/product-card.component";
import "./shop.styles.scss";

const Shop = () => {
  const { products } = useContext(ProductsContext);
  console.log("products:", products);
  return (
    <div className="products-container">
      {products.map((item) => {
        return <ProductCard key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Shop;
