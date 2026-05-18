import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import i18n from "../../i18n";

type LangState = {
  lang: "ar" | "en";
};

const initialState: LangState = {
  lang: "ar",
};

const langSlice = createSlice({
  name: "lang",

  initialState,

  reducers: {
    changeLanguage: (state, action: PayloadAction<"ar" | "en">) => {
      state.lang = action.payload;

      i18n.changeLanguage(action.payload);

      document.documentElement.dir = action.payload === "ar" ? "rtl" : "ltr";
    },
  },
});

export const { changeLanguage } = langSlice.actions;

export default langSlice.reducer;
