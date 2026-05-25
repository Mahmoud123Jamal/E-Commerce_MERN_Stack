import { useTranslation } from "react-i18next";

function Loading() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-center items-center py-32 gap-4">
      <span className="loading loading-spinner loading-lg text-primary" />
      <p className="text-base-content/50 text-sm animate-pulse">
        {t("loading")}
      </p>
    </div>
  );
}

export default Loading;
