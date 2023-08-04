import { createContext, useState, useReducer, useEffect } from "react";
import { getCategoriesAndDocs } from "../utils/firebase/firebase.utils";

// ---------------------------------------------------
export const CategoriesContext = createContext({
  // products: [],
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocs();
      // console.log("CONTEXT_CategoriesProvider categoryMap:", categoryMap);
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
