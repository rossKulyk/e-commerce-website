import { func } from "prop-types";
import { takeLatest, all, call, put } from "redux-saga/effects";
import { getCategoriesAndDocs } from "../../utils/firebase/firebase.utils";
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./category.action";
import { CATEGORIES_ACTION_TYPES } from "./category.types";

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocs, "categories");
    // console.log(" fetchCategoriesAsync categoriesArray:", categoriesArray);
    yield put(fetchCategoriesSuccess(categoriesArray)); // put is generator version of dispatch
    // dispatch(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    // dispatch(fetchCategoriesFailed(error));
    yield put(fetchCategoriesFailed(error));
  }
}

// triggers when call
export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  ); //
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]); // run all generators until evything is done
}
