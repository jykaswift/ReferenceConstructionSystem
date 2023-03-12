import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import docReducer from "./slices/docSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    doc: docReducer,
  },
});
