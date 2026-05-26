import { Link, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { logout } from "../features/auth/authSlice";
import { selectIsAuth } from "../features/auth/authSelectors";
import ThemeToggle from "../components/ThemeToggle";
import LangToggle from "../components/LangToggle";
import ScrollToTop from "../components/ScrollToTop";

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

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-primary font-semibold border-b-2 border-primary pb-1"
      : "text-base-content hover:text-primary transition-colors duration-200";

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
      <ScrollToTop />

      <header
        className="
          sticky
          top-0
          z-50
          bg-base-100/90
          backdrop-blur
          border-b
          border-base-300
          shadow-sm
        "
      >
        <div
          className="
            container
            mx-auto
            h-16
            px-4
            flex
            items-center
            justify-between
          "
        >
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="
                text-2xl
                font-bold
                text-primary
                hover:opacity-80
                transition-opacity
              "
            >
              {t("storeName")}
            </Link>

            <div className="hidden sm:flex items-center gap-2">
              <ThemeToggle />
              <LangToggle />
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}

            {isAuth ? (
              <button onClick={handleLogout} className="btn btn-primary btn-sm">
                {t("logout")}
              </button>
            ) : (
              <>
                <NavLink to="/login" className={navLinkClass}>
                  {t("login")}
                </NavLink>

                <NavLink to="/register" className={navLinkClass}>
                  {t("register")}
                </NavLink>
              </>
            )}
          </nav>

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="
              md:hidden
              btn
              btn-ghost
              btn-sm
            "
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <nav
            className="
              md:hidden
              border-t
              border-base-300
              bg-base-100
            "
          >
            <div
              className="
                flex
                flex-col
                items-center
                gap-5
                py-5
              "
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={navLinkClass}
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
                  className="btn btn-primary btn-sm"
                >
                  {t("logout")}
                </button>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setOpen(false)}
                    className={navLinkClass}
                  >
                    {t("login")}
                  </NavLink>

                  <NavLink
                    to="/register"
                    onClick={() => setOpen(false)}
                    className={navLinkClass}
                  >
                    {t("register")}
                  </NavLink>
                </>
              )}

              <div className="flex items-center gap-3 sm:hidden">
                <ThemeToggle />
                <LangToggle />
              </div>
            </div>
          </nav>
        )}
      </header>

      <main
        className="
          flex-1
          container
          mx-auto
          w-full
          px-4
          py-6
        "
      >
        <Outlet />
      </main>

      <footer
        className="
          border-t
          border-base-300
          bg-base-100
        "
      >
        <div
          className="
            container
            mx-auto
            py-5
            text-center
          "
        >
          <p className="text-sm text-base-content/70">
            © {new Date().getFullYear()} {t("storeName")}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;
