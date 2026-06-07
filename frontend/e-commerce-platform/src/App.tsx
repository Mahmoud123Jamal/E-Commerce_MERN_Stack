import { Suspense } from "react";

import { RouterProvider } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import { router } from "./routes/AppRouter";

import { useAppSelector } from "./hooks/reduxHooks";

import { selectTheme } from "./features/theme/themeSelectors";

import Loading from "./components/Loading";

import "react-toastify/dist/ReactToastify.css";
import { CartDrawer } from "./components/CartDrawer";

function App() {
  const theme = useAppSelector(selectTheme);

  return (
    <div data-theme={theme} className="min-h-screen">
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        theme="colored"
      />
      <CartDrawer />
    </div>
  );
}

export default App;
