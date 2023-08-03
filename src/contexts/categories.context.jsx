import { createContext, useState, useReducer, useEffect } from "react";
import { getCategoriesAndDocs } from "../utils/firebase/firebase.utils";

// ---------------------------------------------------
export const CategoriesContext = createContext({
  // products: [],
  categoriesMap: {},
});

//
export const CATEGORIES_ACTION_TYPE = {
  SET_CATEGORIES_MAP: "SET_CATEGORIES_MAP",
};

//
const categoriesReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CATEGORIES_ACTION_TYPE.SET_CATEGORIES_MAP:
      return {
        ...state,
        categoriesMap: payload,
      };
    default:
      throw new Error(`Unhandeled type ${type} in categoriesReducer !!!`);
  }
};

//
const INITIAL_STATE = {
  categoriesMap: {},
};

export const CategoriesProvider = ({ children }) => {
  // const [categoriesMap, setCategoriesMap] = useState({});
  const [{ categoriesMap }, dispatch] = useReducer(
    categoriesReducer,
    INITIAL_STATE
  ); // destructure state {currUser}=state

  const setCategoriesMap = (category) => {
    dispatch({
      type: CATEGORIES_ACTION_TYPE.SET_CATEGORIES_MAP,
      payload: category,
    });
  };

  // useEffect(() => {
  //   const getCategoriesMap = async () => {
  //     const categoryMap = await getCategoriesAndDocs();
  //     // console.log("CONTEXT_CategoriesProvider categoryMap:", categoryMap);
  //     setCategoriesMap(categoryMap);
  //   };
  //   getCategoriesMap();
  // }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
