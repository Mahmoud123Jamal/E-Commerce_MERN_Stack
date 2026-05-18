import { Moon, Sun } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

import { toggleTheme } from "../features/theme/themeSlice";
import { selectTheme } from "../features/theme/themeSelectors";

function ThemeToggle() {
  const dispatch = useAppDispatch();

  const theme = useAppSelector(selectTheme);

  const isDark = theme === "mjDark";

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        checked={isDark}
        onChange={() => dispatch(toggleTheme())}
      />

      <Sun className="swap-off h-8 w-8 text-yellow-400" />

      <Moon className="swap-on h-8 w-8 text-white" />
    </label>
  );
}

export default ThemeToggle;
