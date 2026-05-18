import type { authWrapperType } from "../types/authWrapperType";
import { motion } from "framer-motion";

function AuthWrapper({ children }: authWrapperType) {
  return (
    <section
      className="
        flex items-center justify-center
        min-h-screen sm:min-h-screen
        overflow-hidden
        px-4 sm:px-6 lg:px-8
        py-0 sm:py-8
      "
    >
      <motion.div
        className="
          w-full
          min-h-screen
          sm:min-h-fit
          flex items-center justify-center
          sm:max-w-lg
          md:max-w-2xl
          lg:max-w-4xl
        "
        initial={{ opacity: 0, y: 80, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.6,
        }}
      >
        {children}
      </motion.div>
    </section>
  );
}

export default AuthWrapper;
