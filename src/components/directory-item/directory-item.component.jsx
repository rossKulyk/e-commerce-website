import { useNavigate } from "react-router-dom";
import {
  BackgroundImg,
  Body,
  DirectoryItemContainer,
} from "./directory-item.styles.jsx";

const DirectoryItem = ({ title, imageUrl, route }) => {
  const navigate = useNavigate();
  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImg
        imageUrl={imageUrl}
        // style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <Body>
        <h2>{title}</h2>
        <p>Shop now</p>
      </Body>
    </DirectoryItemContainer>
  );
};
export default DirectoryItem;
