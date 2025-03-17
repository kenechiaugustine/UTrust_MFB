import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { ImSpinner9 } from 'react-icons/im';

function LandingPage() {
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    setInterval(() => {
      setRedirect(true);
    }, 2200);
  });

  return (
    <>
      {redirect && navigate('/login', { replace: true })}
      <div className="Landing_Container">
        <div>
          <h1>UTrust MFB v1</h1>
          <ImSpinner9 className={'loader'} size={25} />
        </div>
      </div>
    </>
  );
}

export default LandingPage;
