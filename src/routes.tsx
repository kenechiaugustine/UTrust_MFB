import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landing';
import Register from './pages/auth/register';
import Dashboard from './pages/dashboard';
import LoginPage from './pages/auth/login';

export const RouterConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <>
          <Route
            path="/"
            element={
              <>
                <LandingPage />
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                <LoginPage />
              </>
            }
          />

          <Route
            path="/register"
            element={
              <>
                <Register />
              </>
            }
          />

          <Route
            path="/dashboard"
            element={
              <>
                <Dashboard />
              </>
            }
          />
        </>
      </Routes>
    </BrowserRouter>
  );
};
