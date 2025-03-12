import React from 'react';
import './index.css';
import { CustomInput, CustomPasswordInput } from '../../../components/custom-input';
import { useFormik } from 'formik';
import { LoginValidationSchema } from './login-validation';
import Button from '../../../components/custom-button';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

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
      <div className="Image-section"></div>

      <div className="Form-section">
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
              text="Login"
              type="submit"
            />
          </form>

          <p className="account-link">
            Don't Have An Account?{' '}
            <span onClick={() => navigate('/register')} className=" underline cursor-pointer">
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
