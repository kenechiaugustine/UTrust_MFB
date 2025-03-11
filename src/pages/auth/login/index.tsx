import React from 'react';
import LandingPageImage from '/landing-background-image.png';
import './index.css';

const Login: React.FC = () => {
  return (
    <div className="Login-page">
      <div className="Login-image">
        <img src={LandingPageImage} alt="Landing page image" />
      </div>

      <div>
        <h1>Login</h1>
      </div>
    </div>
  );
};

export default Login;
