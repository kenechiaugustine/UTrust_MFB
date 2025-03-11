import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    setInterval(() => {
      setRedirect(true);
    }, 2000);
  });

  return (
    <>
      {redirect && navigate("/login", { replace: true })}
      <div>
        <h1>UTrust Bank</h1>
      </div>
    </>
  );
}

export default LandingPage;
