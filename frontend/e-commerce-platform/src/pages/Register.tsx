import { useNavigate } from "react-router-dom";

import AuthWrapper from "../components/AuthWrapper";
import InputForm from "../components/InputForm";

import { registerUser } from "../features/auth/authService";

import { login } from "../features/auth/authSlice";

import { useAppDispatch } from "../hooks/reduxHooks";

import type { RegisterFormData } from "../types/FormDataType";

import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function Register() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const onSubmit = async (data: RegisterFormData) => {
    try {
      const res = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      dispatch(
        login({
          user: res.data.user,
          token: res.data.token,
        }),
      );

      toast.success(t("registerSuccess"));

      navigate("/");
    } catch (error) {
      toast.error(t("registerError"));
    }
  };

  return (
    <AuthWrapper>
      <InputForm<RegisterFormData>
        key={i18n.language}
        headerText={t("header-title-register")}
        buttonText={t("register")}
        showName={true}
        onSubmit={onSubmit}
      />
    </AuthWrapper>
  );
}

export default Register;
