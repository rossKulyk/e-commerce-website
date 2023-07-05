import CategoryItem from "../category-item/category-item.component";
import "./directory.styles.scss";

const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map(({ title, id, imageUrl }) => {
        return <CategoryItem title={title} id={id} imageUrl={imageUrl} />;
      })}
    </div>
  );
};
export default Directory;
