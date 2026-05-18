import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

import type { formPropsType, FormVariant } from "../types/FormPropsType";
import {
  createLoginSchema,
  createRegisterSchema,
} from "../validations/formSchema";

function InputForm<T extends FormVariant>({
  showName,
  headerText,
  buttonText,
  onSubmit,
}: formPropsType<T>) {
  const { t } = useTranslation();

  const schema = showName ? createRegisterSchema(t) : createLoginSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormVariant>({
    resolver: zodResolver(schema),
  });

  return (
    <div className="w-full flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit as (data: FormVariant) => void)}
        className="
          w-full
          max-w-2xl
          bg-base-100
          text-base-content
          rounded-2xl
          shadow-2xl
          border
          border-base-300
          p-6
          sm:p-8
          md:p-10
          space-y-6
          transition-colors
          duration-300
        "
      >
        {headerText && (
          <h2 className="text-3xl font-bold text-center text-base-content">
            {headerText}
          </h2>
        )}

        {showName && (
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="mb-2 text-sm font-semibold text-base-content"
            >
              {t("name")}
            </label>

            <input
              type="text"
              id="name"
              placeholder={t("namePlaceholder")}
              {...register("name")}
              className="
                px-4
                py-3
                border
                border-base-300
                bg-base-200
                text-base-content
                rounded-xl
                outline-none
                transition-all
                duration-200
                focus:ring-2
                focus:ring-primary
                focus:border-primary
              "
            />

            {"name" in errors && errors.name && (
              <p className="mt-1 text-sm text-error">{errors.name.message}</p>
            )}
          </div>
        )}

        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="mb-2 text-sm font-semibold text-base-content"
          >
            {t("email")}
          </label>

          <input
            type="email"
            id="email"
            placeholder={t("emailPlaceholder")}
            {...register("email")}
            className="
              px-4
              py-3
              border
              border-base-300
              bg-base-200
              text-base-content
              rounded-xl
              outline-none
              transition-all
              duration-200
              focus:ring-2
              focus:ring-primary
              focus:border-primary
            "
          />

          {errors.email && (
            <p className="mt-1 text-sm text-error">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="mb-2 text-sm font-semibold text-base-content"
          >
            {t("password")}
          </label>

          <input
            type="password"
            id="password"
            placeholder={t("passwordPlaceholder")}
            {...register("password")}
            className="
              px-4
              py-3
              border
              border-base-300
              bg-base-200
              text-base-content
              rounded-xl
              outline-none
              transition-all
              duration-200
              focus:ring-2
              focus:ring-primary
              focus:border-primary
            "
          />

          {errors.password && (
            <p className="mt-1 text-sm text-error">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="
            btn
            btn-primary
            w-full
            rounded-xl
            text-lg
            disabled:opacity-70
          "
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              {t("submitLoading")}
            </>
          ) : (
            buttonText
          )}
        </button>
      </form>
    </div>
  );
}

export default InputForm;
