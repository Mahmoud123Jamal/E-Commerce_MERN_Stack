import { useNavigate } from "react-router-dom";

import AuthWrapper from "../components/AuthWrapper";
import InputForm from "../components/InputForm";

import { loginUser } from "../features/auth/authService";

import { login } from "../features/auth/authSlice";

import { useAppDispatch } from "../hooks/reduxHooks";

import type { LoginFormData } from "../types/FormDataType";

import { toast } from "react-toastify";

function Login() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await loginUser({
        email: data.email,
        password: data.password,
      });

      dispatch(login({ user: res.data.user, token: res.data.token }));

      toast.success("تم تسجيل الدخول بنجاح!");

      navigate("/");
    } catch (error) {
      toast.error("حدث خطأ أثناء تسجيل الدخول.");
    }
  };

  return (
    <AuthWrapper>
      <InputForm<LoginFormData>
        headerText="تسجيل الدخول"
        buttonText="تسجيل الدخول"
        showName={false}
        onSubmit={onSubmit}
      />
    </AuthWrapper>
  );
}

export default Login;
