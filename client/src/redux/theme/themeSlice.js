import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "ligth",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "ligth" ? "dark" : "ligth";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
