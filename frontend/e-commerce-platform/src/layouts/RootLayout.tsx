import { Link, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

import { Menu, X } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

import { logout } from "../features/auth/authSlice";
import { selectIsAuth } from "../features/auth/authSelectors";

const RootLayout = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(selectIsAuth);
  const handleLogout = () => {
    dispatch(logout());
  };

  const navItems = [{ to: "/", label: "الرئيسية" }];

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f3f3]">
      <header className="bg-[#131921] shadow-lg">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold text-[#ff9900] hover:text-orange-400 transition"
          >
            متجر أم جي
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? "text-[#ff9900] font-semibold border-b-2 border-[#ff9900] pb-1"
                    : "text-white hover:text-[#ff9900] transition"
                }
              >
                {item.label}
              </NavLink>
            ))}

            {isAuth ? (
              <button
                onClick={handleLogout}
                className="
                  cursor-pointer
                  bg-[#ff9900]
                  text-white
                  px-4 py-2
                  rounded-lg
                  hover:bg-orange-500
                  transition
                "
              >
                تسجيل الخروج
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#ff9900] font-semibold border-b-2 border-[#ff9900] pb-1"
                      : "text-white hover:text-[#ff9900] transition"
                  }
                >
                  تسجيل الدخول
                </NavLink>

                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#ff9900] font-semibold border-b-2 border-[#ff9900] pb-1"
                      : "text-white hover:text-[#ff9900] transition"
                  }
                >
                  تسجيل حساب
                </NavLink>
              </>
            )}
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {open && (
          <nav
            className="
              md:hidden
              bg-[#232f3e]
              flex flex-col
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
                    ? "text-[#ff9900] font-semibold"
                    : "text-white hover:text-[#ff9900] transition"
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
                  cursor-pointer
                  bg-[#ff9900]
                  text-white
                  px-4 py-2
                  rounded-lg
                  hover:bg-orange-500
                  transition
                "
              >
                تسجيل الخروج
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="text-white hover:text-[#ff9900]"
                >
                  تسجيل الدخول
                </NavLink>

                <NavLink
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="text-white hover:text-[#ff9900]"
                >
                  تسجيل حساب
                </NavLink>
              </>
            )}
          </nav>
        )}
      </header>

      <main className="flex-1 container mx-auto w-full p-4">
        <Outlet />
      </main>

      <footer className="bg-[#131921] text-center py-4 text-white">
        <p className="text-sm sm:text-base">
          © {new Date().getFullYear()} متجر أم جي
        </p>
      </footer>
    </div>
  );
};

export default RootLayout;
