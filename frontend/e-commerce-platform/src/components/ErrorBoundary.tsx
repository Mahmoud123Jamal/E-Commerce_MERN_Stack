import { useTranslation } from "react-i18next";

export function ErrorFallback() {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-base-200 text-center px-4">
      <div className="max-w-md p-6 bg-base-100 rounded-xl shadow-lg border border-base-300">
        <h2 className="text-2xl font-bold text-error mb-2">
          {t("errorBoundary.title")}
        </h2>
        <p className="text-base-content/80 text-lg font-medium">
          {t("errorBoundary.message")}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="btn btn-error btn-sm mt-5 text-white font-semibold"
        >
          {t("errorBoundary.button")}
        </button>
      </div>
    </div>
  );
}
