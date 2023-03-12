import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDocsById = createAsyncThunk(
  "docs/fetchDocsById",
  async (_, thunkAPI) => {
    const { doc } = thunkAPI.getState();
    try {
      const { data } = await axios.get(
        `http://localhost:4444/api/doc/document?id=${doc.id}`
      );
      return data.doc_html;
    } catch (e) {
      console.log(e, "error");
    }
  }
);

const initialState = {
  status: "loading",
  id: "",
  content: "",
};

export const docSlice = createSlice({
  name: "doc",
  initialState,
  reducers: {
    setDocId(state, action) {
      state.id = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchDocsById.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchDocsById.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.content = action.payload;
    });

    builder.addCase(fetchDocsById.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const { setDocId } = docSlice.actions;

export default docSlice.reducer;
