import { createStore, compose, applyMiddleware } from "redux";
import mainReducers from "../reducers";
import thunk from "redux-thunk";

const initialState = {
  loading: true,
  student: "",
  errors: "",
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default function configureStore() {
  return createStore(
    mainReducers,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
}
