import React from 'react';
import { ImSpinner9 } from 'react-icons/im';
import './index.css';

interface ButtonProp {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  text?: string;
  className?: string;
  isLoading?: boolean;
  style?: string;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
}

const Button = ({ onClick, text, isLoading, disabled, style, type, ...rest }: ButtonProp) => {
  return (
    <button className={`${'ButtonComp'} ${style}`} onClick={onClick} disabled={isLoading ? true : disabled} type={type} {...rest}>
      {isLoading ? (
        <span className={'loader'}>
          <ImSpinner9 className={'loader'} size={25} />
        </span>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
