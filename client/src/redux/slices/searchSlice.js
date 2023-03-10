import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDocsBySearch = createAsyncThunk(
  "docs/fetchDocsBySearch",
  async (_, thunkAPI) => {
    const { search } = thunkAPI.getState();

    const { data } = await axios.get(
      `http://localhost:4444/api/doc/search?query=${search.currentSearchValue}&page=${search.page}`
    );

    console.log(
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
  isClicked: false,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchParams(state, action) {
      state.currentSearchValue = action.payload;
      state.page = 1;
      state.items = [];
      state.isClicked = !state.isClicked;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchDocsBySearch.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchDocsBySearch.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.items = action.payload;
      state.page += 1;
    });

    builder.addCase(fetchDocsBySearch.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const { setSearchParams } = searchSlice.actions;

export default searchSlice.reducer;
