import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDocsBySearch = createAsyncThunk(
  "docs/fetchDocsBySearch",
  async (currentSearchValue) => {
    const { data } = await axios.get(
      `http://localhost:4444/api/doc/search?query=${currentSearchValue}`
    );

    return { data, currentSearchValue };
  }
);

const initialState = {
  searchValue: "",
  status: "loading",
  items: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
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
      state.searchValue = action.payload.currentSearchValue;
      state.items = action.payload.data;
    });

    builder.addCase(fetchDocsBySearch.rejected, (state) => {
      state.status = "error";
    });
  },

  // extraReducers: {
  //   [fetchDocsBySearch.pending]: (state) => {
  //     state.status = "loading";
  //   },
  //   [fetchDocsBySearch.fulfilled]: (state, action) => {
  //     state.status = "fulfilled";
  //     state.searchValue = action.payload.currentSearchValue;
  //     state.items = action.payload.data;
  //   },
  //   [fetchDocsBySearch.rejected]: (state) => {
  //     state.status = "error";
  //   },
  // },
});

export const { setSearchValue, setItems } = searchSlice.actions;

export default searchSlice.reducer;
