import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDocsBySearch = createAsyncThunk(
  "docs/fetchDocsBySearch",
  async (_, thunkAPI) => {
    const { search } = thunkAPI.getState();

    const { data } = await axios.get(
      `http://localhost:4444/api/doc/search?query=${search.currentSearchValue}&page=${search.page}`
    );

    return data;
  }
);

const initialState = {
  currentSearchValue: "",
  page: 1,
  status: "loading",
  items: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setCurrentSearchValue(state, action) {
      state.currentSearchValue = action.payload;
    },
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchDocsBySearch.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchDocsBySearch.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.items = [...state.items, ...action.payload];
      state.page += 1;
    });

    builder.addCase(fetchDocsBySearch.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const { setCurrentSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
