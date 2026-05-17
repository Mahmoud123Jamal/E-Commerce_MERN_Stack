import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { formPropsType, FormVariant } from "../types/FormPropsType";

import { loginSchema, registerSchema } from "../validations/formSchema";

function InputForm<T extends FormVariant>({
  showName,
  headerText,
  buttonText,
  onSubmit,
}: formPropsType<T>) {
  const schema = showName ? registerSchema : loginSchema;

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
          bg-white
          rounded-2xl
          shadow-2xl
          border
          border-gray-200
          p-6
          sm:p-8
          md:p-10
          space-y-6
        "
      >
        {/* Header */}
        {headerText && (
          <h2 className="text-3xl font-bold text-center text-[#131921]">
            {headerText}
          </h2>
        )}

        {/* Name */}
        {showName && (
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="mb-2 text-sm font-semibold text-[#131921]"
            >
              الاسم
            </label>

            <input
              type="text"
              id="name"
              placeholder="اكتب اسمك"
              {...register("name")}
              className="
                px-4
                py-3
                border
                border-gray-300
                rounded-xl
                outline-none
                transition
                focus:ring-2
                focus:ring-[#ff9900]
                focus:border-[#ff9900]
              "
            />

            {"name" in errors && errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
        )}

        {/* Email */}
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="mb-2 text-sm font-semibold text-[#131921]"
          >
            البريد الإلكتروني
          </label>

          <input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            {...register("email")}
            className="
              px-4
              py-3
              border
              border-gray-300
              rounded-xl
              outline-none
              transition
              focus:ring-2
              focus:ring-[#ff9900]
              focus:border-[#ff9900]
            "
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="mb-2 text-sm font-semibold text-[#131921]"
          >
            كلمة المرور
          </label>

          <input
            type="password"
            id="password"
            placeholder="********"
            {...register("password")}
            className="
              px-4
              py-3
              border
              border-gray-300
              rounded-xl
              outline-none
              transition
              focus:ring-2
              focus:ring-[#ff9900]
              focus:border-[#ff9900]
            "
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="
            w-full
            py-3
            text-lg
            font-semibold
            text-white
            bg-[#ff9900]
            rounded-xl
            transition-all
            duration-200
            hover:bg-orange-500
            active:scale-[0.98]
            disabled:opacity-70
            disabled:cursor-not-allowed
            flex
            items-center
            justify-center
            gap-2
            cursor-pointer
          "
        >
          {isSubmitting ? (
            <>
              <span
                className="
                  w-5
                  h-5
                  border-2
                  border-white
                  border-t-transparent
                  rounded-full
                  animate-spin
                "
              />
              جاري الإرسال...
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
