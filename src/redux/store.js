import { configureStore } from "@reduxjs/toolkit";
import indexReducer from "./reducers/index-reducer";

export default configureStore({
  reducer: { indexReducer },
});
