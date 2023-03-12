import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDocsById = createAsyncThunk(
  "docs/fetchDocsById",
  async (_, thunkAPI) => {
    const { search } = thunkAPI.getState();

    try {
      const { headers, data } = await axios.get(
        `http://localhost:4444/api/doc/search?query=${search.currentSearchValue}&page=${search.currentPage}`
      );

      return { data, totalPage: headers["total-page"] };
    } catch (e) {
      return { data: [], totalPage: 0 };
    }
  }
);

const initialState = {
  id: "",
  content: "",
};

export const docSlice = createSlice({
  name: "doc",
  initialState,
  reducers: {
    setDocId(state, action) {
      state.id = action.payload;
      console.log(state.id);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchDocsById.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchDocsById.fulfilled, (state, action) => {
      state.status = "fulfilled";
    });

    builder.addCase(fetchDocsById.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const { setDocId } = docSlice.actions;

export default docSlice.reducer;
