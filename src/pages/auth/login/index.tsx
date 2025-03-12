import React from 'react';
import './index.css';
import { CustomInput, CustomPasswordInput } from '../../../components/custom-input';
import { useFormik } from 'formik';
import { LoginValidationSchema } from './login-validation';
import Button from '../../../components/custom-button';

const LoginPage: React.FC = () => {
  const onSubmit = () => {};

  const { values, handleChange, touched, errors, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginValidationSchema,
    onSubmit,
  });

  return (
    <div className="Login-page">
      <div className="Login-image-section"></div>

      <div className="Login-form-section">
        <div>
          <h2 className="form-title">Welcome Back, Please login to continue</h2>

          <form className="form-container">
            <CustomInput
              placeholder="Enter Email"
              value={values.email}
              labelText="Enter your Email"
              onChange={handleChange('email')}
              errorMessage={touched.email ? errors.email : ''}
            />

            <CustomPasswordInput
              placeholder="Enter Password"
              value={values.password}
              labelText="Enter your Password"
              onChange={handleChange('password')}
              errorMessage={touched.password ? errors.password : ''}
            />

            <Button
              onClick={() => {
                handleSubmit();
              }}
              isLoading={false}
              text="Sign In"
              type='submit'
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
