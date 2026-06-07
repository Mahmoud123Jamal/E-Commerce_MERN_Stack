import { Link, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import {
  Menu,
  X,
  Settings,
  Heart,
  ShoppingCart,
  LogOut,
  UserPlus,
  LogIn,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { logout } from "../features/auth/authSlice";
import { selectIsAuth } from "../features/auth/authSelectors";
import ThemeToggle from "../components/ThemeToggle";
import LangToggle from "../components/LangToggle";
import ScrollToTop from "../components/ScrollToTop";
import { useCartDrawer } from "../hooks/useCartDrawer"; // 🌟 جلب الـ Hook

const RootLayout = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  const { t } = useTranslation();

  const { openDrawer, cart } = useCartDrawer();
  const cartItemsCount = cart?.items?.length || 0;

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
    <div className="min-h-screen flex flex-col bg-base-200 text-base-content transition-colors duration-300">
      <ScrollToTop />

      <header className="sticky top-0 z-50 bg-base-100/90 backdrop-blur border-b border-base-300 shadow-sm">
        <div className="container mx-auto h-16 px-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity"
            >
              {t("storeName")}
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}

            {!isAuth && (
              <div className="dropdown dropdown-hover dropdown-bottom">
                <div
                  tabIndex={0}
                  role="button"
                  className="text-base-content hover:text-primary transition-colors duration-200 cursor-pointer font-medium"
                >
                  {t("account")}
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-box w-40 gap-1 border border-base-300 z-60"
                >
                  <li>
                    <NavLink
                      to="/login"
                      className="flex items-center justify-between py-2"
                    >
                      <span>{t("login")}</span>
                      <LogIn size={16} />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/register"
                      className="flex items-center justify-between py-2"
                    >
                      <span>{t("register")}</span>
                      <UserPlus size={16} />
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </nav>

          <div className="hidden sm:flex items-center gap-4">
            {isAuth && (
              <>
                <Link
                  to="/favorites"
                  className="btn btn-ghost btn-circle btn-sm text-base-content hover:text-primary"
                >
                  <Heart size={22} />
                </Link>

                <button
                  onClick={openDrawer}
                  className="btn btn-ghost btn-circle btn-sm text-base-content hover:text-primary relative"
                >
                  <ShoppingCart size={22} />

                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 badge badge-primary badge-sm text-white">
                      {cartItemsCount}
                    </span>
                  )}
                </button>
              </>
            )}

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-sm gap-1 normal-case font-medium"
              >
                <Settings size={18} />
                <span>{t("settings", "Settings")}</span>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-4 shadow-xl bg-base-100 rounded-box w-56 gap-3 mt-2 border border-base-300 z-60"
              >
                <li className="flex flex-row items-center justify-between px-2 py-1">
                  <span className="text-sm font-medium">
                    {t("theme", "Theme")}
                  </span>
                  <ThemeToggle />
                </li>
                <div className="divider my-0"></div>
                <li className="flex flex-row items-center justify-between px-2 py-1">
                  <span className="text-sm font-medium">
                    {t("language", "Language")}
                  </span>
                  <LangToggle />
                </li>
                {isAuth && (
                  <>
                    <div className="divider my-0"></div>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="btn btn-error btn-sm btn-outline w-full flex items-center justify-between px-3 mt-1"
                      >
                        <span className="font-semibold">{t("logout")}</span>
                        <LogOut size={16} />
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="md:hidden btn btn-ghost btn-sm"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <nav className="md:hidden border-t border-base-300 bg-base-100">
            <div className="flex flex-col items-center gap-5 py-5">
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

              {!isAuth && (
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

              <div className="divider w-full px-10 my-1"></div>

              <div className="flex items-center gap-6">
                {isAuth && (
                  <>
                    <Link
                      to="/favorites"
                      onClick={() => setOpen(false)}
                      className="btn btn-ghost btn-circle text-base-content"
                    >
                      <Heart size={24} />
                    </Link>

                    <button
                      onClick={() => {
                        setOpen(false);
                        openDrawer();
                      }}
                      className="btn btn-ghost btn-circle text-base-content relative"
                    >
                      <ShoppingCart size={24} />
                      {cartItemsCount > 0 && (
                        <span className="absolute top-0 right-0 badge badge-primary badge-xs text-white">
                          {cartItemsCount}
                        </span>
                      )}
                    </button>
                  </>
                )}

                <div className="dropdown dropdown-top dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost gap-1 normal-case"
                  >
                    <Settings size={20} />
                    <span>{t("settings", "Settings")}</span>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-4 shadow-xl bg-base-100 rounded-box w-52 gap-3 mb-2 border border-base-300 z-60"
                  >
                    <li className="flex flex-row items-center justify-between px-1">
                      <span className="text-sm">{t("theme")}</span>
                      <ThemeToggle />
                    </li>
                    <li className="flex flex-row items-center justify-between px-1">
                      <span className="text-sm">{t("language")}</span>
                      <LangToggle />
                    </li>
                    {isAuth && (
                      <li className="mt-2">
                        <button
                          onClick={() => {
                            handleLogout();
                            setOpen(false);
                          }}
                          className="btn btn-error btn-sm text-white w-full"
                        >
                          {t("logout")}
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1 container mx-auto w-full px-4 py-6">
        <Outlet />
      </main>

      <footer className="border-t border-base-300 bg-base-100">
        <div className="container mx-auto py-5 text-center">
          <p className="text-sm text-base-content/70">
            © {new Date().getFullYear()} {t("storeName")}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;
