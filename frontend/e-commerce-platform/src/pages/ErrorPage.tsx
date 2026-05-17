import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="bg-[#f3f3f3] flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 sm:p-12 text-center border border-gray-200">
        <h1 className="mb-4 text-7xl sm:text-8xl lg:text-9xl font-extrabold tracking-tight text-[#ff9900]">
          500
        </h1>

        <p className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#131921]">
          حدث خطأ في السيرفر
        </p>

        <p className="mb-8 text-base sm:text-lg text-gray-600">
          عذرًا، حدث خطأ غير متوقع. حاول مرة أخرى لاحقًا.
        </p>

        <Link
          to="/"
          className="
            inline-block
            px-6 py-3
            text-white
            font-semibold
            bg-[#ff9900]
            rounded-xl
            transition
            hover:bg-orange-500
            active:scale-95
          "
        >
          العودة للرئيسية
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
