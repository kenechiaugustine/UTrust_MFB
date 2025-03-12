import React, { useState } from 'react';
import './index.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

interface IFormInput {
  placeholder: string;
  labelText?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  type?: string;
  className?: string;
  checked?: boolean;
  disabled?: boolean;
}

export const CustomInput = ({ placeholder, labelText, errorMessage, onChange, value }: IFormInput) => {
  return (
    <div className="InputComponent">
      {labelText && <label className="label">{labelText}</label>}
      <input className="input" placeholder={placeholder} onChange={onChange} value={value} />
      {/* {errorMessage && <p className="error">{errorMessage}</p>} */}
    </div>
  );
};

export const CustomPasswordInput = ({ placeholder, labelText, errorMessage }: IFormInput) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="InputComponent">
      {labelText && <label className="label">{labelText}</label>}
      <div className="passwordInputWrap">
        <input type={showPassword ? 'text' : 'password'} className="passwordInput" placeholder={placeholder} />
        <button className="iconButton" type='button' onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>
      {/* {errorMessage && <p className='error'>{errorMessage}</p>} */}
    </div>
  );
};
