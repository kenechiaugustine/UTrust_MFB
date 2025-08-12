import React from 'react';
import './index.css';
import { CustomInput, CustomPasswordInput } from '../../../components/custom-input';
import { useFormik } from 'formik';
import { LoginValidationSchema } from './login-validation';
import Button from '../../../components/custom-button';
import { useNavigate } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from '../../../utils/toast';
import { useLoginMutation } from '../../../redux/auth/authApi';
import { setAuthToken } from '../../../utils/helpers';
import { useAppDispatch } from '../../../redux/hooks';
import { setUser } from '../../../redux/auth/authSlice';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit = () => {
    const payload = {
      email: values.email.replace(/\s/g, '').toLowerCase(),
      password: values.password,
    };

    login(payload)
      .unwrap()
      .then((result) => {
        setAuthToken(result?.data?.authToken);
        dispatch(setUser(result?.data));
        showSuccessToast(result?.message);
        navigate('/dashboard');
      })
      .catch((error) => {
        // console.log(error?.data?.message[0]);
        showErrorToast(error?.data?.message);
      });
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
      errorMessage: '',
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
          <form className="form-container" onSubmit={handleSubmit}>
            <CustomInput
              placeholder="Enter Email"
              value={values.email}
              labelText="Enter your Email"
              onChange={handleChange('email')}
              // errorMessage={touched.email ? errors.email : ''}
            />

            <CustomPasswordInput
              placeholder="Enter Password"
              value={values.password}
              labelText="Enter your Password"
              onChange={handleChange('password')}
              // errorMessage={touched.password ? errors.password : ''}
            />

            <Button
              onClick={() => {
                handleSubmit();
              }}
              isLoading={isLoading}
              text="Login"
              type="submit"
            />
          </form>
          <p className="account-link">
            Don't Have An Account?{' '}
            <span onClick={() => navigate('/register')} className="underline cursor-pointer">
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
