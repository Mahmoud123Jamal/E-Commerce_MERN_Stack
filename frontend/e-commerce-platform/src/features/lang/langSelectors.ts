import type { RootState } from "../../app/store";

export const selectLang = (state: RootState) => state.lang.lang;
