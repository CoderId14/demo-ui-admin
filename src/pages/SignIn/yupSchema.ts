import * as yup from 'yup'

export const formSchema = yup.object().shape({
  usernameOrEmail: yup
    .string()
    .matches(
      /^(?:[A-Z\d][A-Z\d_-]{4,50}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i,
      "Email or username invalid",
    )
    .required("Username or Email is required")
    .min(4, "Username or Email length should be at least 4 characters")
    .max(25, "Username or Email length cannot exceed more than 50 characters"),

  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,50}$/,
      "Password must minimum 4 characters, at least 1 letter and 1 number, and doesn't contain special characters",
    )
    .required("Password is required")
    .max(50, " Password length cannot exceed more than 50 characters"),
});
