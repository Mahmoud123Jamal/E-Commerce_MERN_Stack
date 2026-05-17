import { useNavigate } from "react-router-dom";

import AuthWrapper from "../components/AuthWrapper";
import InputForm from "../components/InputForm";

import { registerUser } from "../features/auth/authService";

import { login } from "../features/auth/authSlice";

import { useAppDispatch } from "../hooks/reduxHooks";

import type { RegisterFormData } from "../types/FormDataType";

import { toast } from "react-toastify";

function Register() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

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

      toast.success("تم إنشاء الحساب بنجاح!");

      navigate("/");
    } catch (error) {
      toast.error("حدث خطأ أثناء إنشاء الحساب.");
    }
  };

  return (
    <AuthWrapper>
      <InputForm<RegisterFormData>
        headerText="تسجيل حساب جديد"
        buttonText="تسجيل حساب جديد"
        showName={true}
        onSubmit={onSubmit}
      />
    </AuthWrapper>
  );
}

export default Register;
