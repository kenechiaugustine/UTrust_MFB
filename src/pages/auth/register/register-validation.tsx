import * as yup from 'yup';

export const RegisterValidationSchema = yup.object({
  firstName: yup.string().trim().required('First name required!'),
  lastName: yup.string().trim().required('Last name required!'),
  email: yup
    .string()
    .transform((value) => value.trim())
    .email()
    .matches(/^\S+@\S+\.\S+$/, 'Invalid email address')
    .required('Email required!'),
  phone: yup.string().trim().required('Phone number required!'),
  password: yup
    .string()
    .trim()
    .required('Password required!')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])(?=.{8,})/,
      'Must Contain 8 Characters, Uppercase, Lowercase, Number and Special Character',
    ),
  // confirmPassword: yup
  //   .string()
  //   .label('Confirm new password')
  //   .required()
  //   .matches(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])(?=.{8,})/,
  //     'Must Contain 8 Characters, Uppercase, Lowercase, Number and Special Character',
  //   )
  //   .oneOf([yup.ref('password')], 'Passwords must match'),
});
