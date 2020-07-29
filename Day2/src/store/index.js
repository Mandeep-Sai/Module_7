import { createStore } from "redux";
import mainReducers from "../reducers";

const initialState = {
  loading: true,
  errors: "",
};

export default function configureStore() {
  return createStore(
    mainReducers,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
