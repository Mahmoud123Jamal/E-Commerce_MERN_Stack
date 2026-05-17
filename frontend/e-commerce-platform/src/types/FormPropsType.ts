import type { LoginFormData, RegisterFormData } from "./FormDataType";

export type FormVariant = LoginFormData | RegisterFormData;

export type formPropsType<T extends FormVariant = FormVariant> = {
  showName: boolean;
  headerText?: string;
  buttonText: string;
  onSubmit: (data: T) => void | Promise<void>;
};
