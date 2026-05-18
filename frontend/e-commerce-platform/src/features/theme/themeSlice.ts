import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ThemeType = "mjLight" | "mjDark";

type ThemeState = {
  theme: ThemeType;
};

const initialState: ThemeState = {
  theme: "mjLight",
};

const themeSlice = createSlice({
  name: "theme",

  initialState,

  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "mjLight" ? "mjDark" : "mjLight";
    },

    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
