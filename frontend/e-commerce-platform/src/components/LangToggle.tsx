import { Languages } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

import { changeLanguage } from "../features/lang/langSlice";

import { selectLang } from "../features/lang/langSelectors";

function LangToggle() {
  const dispatch = useAppDispatch();

  const lang = useAppSelector(selectLang);

  const toggleLanguage = () => {
    dispatch(changeLanguage(lang === "ar" ? "en" : "ar"));
  };

  return (
    <button onClick={toggleLanguage} className="btn btn-sm btn-primary">
      <Languages size={18} />

      {lang === "ar" ? "EN" : "AR"}
    </button>
  );
}

export default LangToggle;
