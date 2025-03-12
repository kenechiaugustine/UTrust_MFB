import React from 'react';
import './index.css';
import { CustomInput, CustomPasswordInput } from '../../../components/custom-input';
import { useFormik } from 'formik';
import Button from '../../../components/custom-button';
import { RegisterValidationSchema } from './register-validation';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const onSubmit = () => {};

  const { values, handleChange, touched, errors, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: RegisterValidationSchema,
    onSubmit,
  });

  return (
    <div className="Register-page">
      <div className="Image-section"></div>

      <div className="Form-section">
        <div>
          <h2 className="form-title">Welcome To UTrust Bank </h2>

          <p>Kindly fill the form to Open an account</p>

          <form className="form-container">
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

            <CustomPasswordInput
              placeholder="Enter your Password again"
              value={values.confirmPassword}
              labelText="Enter your Password again"
              onChange={handleChange('confirmPassword')}
              errorMessage={touched.confirmPassword ? errors.confirmPassword : ''}
            />

            <Button
              onClick={() => {
                handleSubmit();
              }}
              isLoading={false}
              text="Register"
              type="submit"
            />
          </form>

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
