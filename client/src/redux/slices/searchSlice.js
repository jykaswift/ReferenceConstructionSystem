import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDocsBySearch = createAsyncThunk(
  "docs/fetchDocsBySearch",
  async (_, thunkAPI) => {
    const { search } = thunkAPI.getState();

    const { headers, data } = await axios.get(
      `http://localhost:4444/api/doc/search?query=${search.currentSearchValue}&page=${search.currentPage}`
    );
    console.log("fetch");
    return { data, totalPage: headers["total-page"] };
  }
);

const initialState = {
  currentSearchValue: "",
  currentPage: 1,
  status: "loading",
  items: [],
  isClicked: false,
  isLoading: false,
  totalPage: 1,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchParams(state, action) {
      state.currentSearchValue = action.payload;
      state.currentPage = 0;
      state.items = [];
      state.isClicked = !state.isClicked;
      state.isLoading = true;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchDocsBySearch.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchDocsBySearch.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.items = [...state.items, ...action.payload.data];
      state.currentPage += 1;
      state.isLoading = false;
      state.totalPage = parseInt(action.payload.totalPage);
      console.log(state.items.length, "lenght");
      console.log(state.currentPage, "current");
      console.log(state.totalPage, "total");
    });

    builder.addCase(fetchDocsBySearch.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const { setSearchParams } = searchSlice.actions;

export default searchSlice.reducer;
