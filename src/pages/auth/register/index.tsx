import React from 'react';
import './index.css';
import { CustomInput, CustomPasswordInput } from '../../../components/custom-input';
import { useFormik } from 'formik';
import Button from '../../../components/custom-button';
import { RegisterValidationSchema } from './register-validation';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../../redux/auth/authApi';
import { setAuthToken } from '../../../utils/helpers';
import { showErrorToast, showSuccessToast } from '../../../utils/toast';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const onSubmit = () => {
    const payload = {
      email: values.email.replace(/\s/g, '').toLowerCase(),
      firstName: values.firstName.replace(/\s/g, ''),
      lastName: values.lastName.replace(/\s/g, ''),
      phone: values.phone,
      password: values.password,
    };

    register(payload)
      .unwrap()
      .then((result) => {
        setAuthToken(result?.data?.authToken);
        showSuccessToast(result?.message);
        navigate('/login');
      })
      .catch((error) => {
        // console.log(error?.data?.message[0]);
        showErrorToast(error?.data?.message);
      });
  };

  const { values, handleChange, touched, errors, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      password: '',
    },
    validationSchema: RegisterValidationSchema,
    onSubmit,
  });

  return (
    <div className="Register-page">
      <div className="Image-section"></div>

      <div className="Form-section">
        <div>
          <h2 className="form-title">Welcome To UTrust MFB </h2>

          <p>Kindly fill the form to Open an account</p>

          <div className="form-container">
            <CustomInput
              placeholder="Enter your firstName"
              value={values.firstName}
              labelText="Enter your First Name"
              onChange={handleChange('firstName')}
              errorMessage={touched.firstName ? errors.firstName : ''}
            />

            <CustomInput
              placeholder="Enter lastName"
              value={values.lastName}
              labelText="Enter your Last Name"
              onChange={handleChange('lastName')}
              errorMessage={touched.lastName ? errors.lastName : ''}
            />

            <CustomInput
              placeholder="Enter Email"
              value={values.email}
              labelText="Enter your Email"
              onChange={handleChange('email')}
              errorMessage={touched.email ? errors.email : ''}
            />

            <CustomInput
              placeholder="Enter Phone Number"
              value={values.phone}
              labelText="Enter your Phone Number"
              onChange={handleChange('phone')}
              errorMessage={touched.phone ? errors.phone : ''}
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
                onSubmit();
              }}
              isLoading={isLoading}
              text="Register"
              type="submit"
            />
          </div>

          <p className="account-link">
            Already Have An Account?{' '}
            <span onClick={() => navigate('/login')} className=" underline cursor-pointer">
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
