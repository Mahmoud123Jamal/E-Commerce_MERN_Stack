import { Link, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

import { Menu, X } from "lucide-react";

import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

import { logout } from "../features/auth/authSlice";
import { selectIsAuth } from "../features/auth/authSelectors";

import ThemeToggle from "../components/ThemeToggle";
import LangToggle from "../components/LangToggle";

const RootLayout = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(selectIsAuth);

  const { t } = useTranslation();

  const handleLogout = () => {
    dispatch(logout());
  };

  const navItems = [
    {
      to: "/",
      label: t("home"),
    },
    {
      to: "/products",
      label: t("products"),
    },
  ];

  return (
    <div
      className="
        min-h-screen
        flex
        flex-col
        bg-base-200
        text-base-content
        transition-colors
        duration-300
      "
    >
      {/* Header */}
      <header
        className="
          bg-base-100
          shadow-lg
          border-b
          border-base-300
        "
      >
        <div
          className="
            container
            mx-auto
            px-4
            h-16
            flex
            items-center
            justify-between
          "
        >
          {/* Logo + Theme */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="
                text-xl
                sm:text-2xl
                font-bold
                text-primary
                hover:opacity-80
                transition
              "
            >
              {t("storeName")}
            </Link>

            <ThemeToggle />

            <LangToggle />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? `
                      text-primary
                      font-semibold
                      border-b-2
                      border-primary
                      pb-1
                    `
                    : `
                      text-base-content
                      hover:text-primary
                      transition
                    `
                }
              >
                {item.label}
              </NavLink>
            ))}

            {isAuth ? (
              <button
                onClick={handleLogout}
                className="
                  btn
                  btn-primary
                  btn-sm
                "
              >
                {t("logout")}
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? `
                        text-primary
                        font-semibold
                        border-b-2
                        border-primary
                        pb-1
                      `
                      : `
                        text-base-content
                        hover:text-primary
                        transition
                      `
                  }
                >
                  {t("login")}
                </NavLink>

                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? `
                        text-primary
                        font-semibold
                        border-b-2
                        border-primary
                        pb-1
                      `
                      : `
                        text-base-content
                        hover:text-primary
                        transition
                      `
                  }
                >
                  {t("register")}
                </NavLink>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="
              md:hidden
              text-base-content
            "
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {open && (
          <nav
            className="
              md:hidden
              bg-base-100
              border-t
              border-base-300
              flex
              flex-col
              items-center
              gap-4
              py-4
            "
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-semibold"
                    : "text-base-content hover:text-primary transition"
                }
              >
                {item.label}
              </NavLink>
            ))}

            {isAuth ? (
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="
                  btn
                  btn-primary
                  btn-sm
                "
              >
                {t("logout")}
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="
                    text-base-content
                    hover:text-primary
                    transition
                  "
                >
                  {t("login")}
                </NavLink>

                <NavLink
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="
                    text-base-content
                    hover:text-primary
                    transition
                  "
                >
                  {t("register")}
                </NavLink>
              </>
            )}
          </nav>
        )}
      </header>

      {/* Pages */}
      <main className="flex-1 container mx-auto w-full p-2">
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        className="
          bg-base-100
          border-t
          border-base-300
          text-center
          py-4
        "
      >
        <p className="text-sm">
          © {new Date().getFullYear()} {t("storeName")}
        </p>
      </footer>
    </div>
  );
};

export default RootLayout;
