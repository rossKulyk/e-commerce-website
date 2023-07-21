import DirectoryItem from "../directory-item/directory-item.component";
import "./directory.styles.scss";

const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map(({ title, id, imageUrl }) => {
        return <DirectoryItem title={title} key={id} imageUrl={imageUrl} />;
      })}
    </div>
  );
};
export default Directory;
