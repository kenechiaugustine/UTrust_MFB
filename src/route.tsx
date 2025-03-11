//
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login';
import LandingPage from './pages/landing';
import Register from './pages/auth/register';
import Dashboard from './pages/dashboard';

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
                <Login />
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
