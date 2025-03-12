import * as yup from "yup";

export const LoginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .transform((value) => value.trim())
    .email()
    .matches(/^\S+@\S+\.\S+$/, "Invalid email address")
    .required("Email required!"),
  password: yup.string().trim().required("Password required!"),
});