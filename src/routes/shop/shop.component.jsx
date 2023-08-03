import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategoriesAndDocs } from "../../utils/firebase/firebase.utils";
import CategoriesPreview from "../../routes/catagories-preview/categories-preview.component";
import Category from "../category/category.component";
import { setCategoriesMap } from "../../store/categories/category.action";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocs();
      // console.log("CONTEXT_CategoriesProvider categoryMap:", categoryMap);
      dispatch(setCategoriesMap(categoryMap));
    };
    getCategoriesMap();
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};
export default Shop;
