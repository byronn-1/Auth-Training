import { Routes, Route } from "react-router-dom";

import { UserInfoPage } from "./pages/UserInfoPage";
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from "./pages/SignUpPage";

import { PrivateRoute } from './auth/PrivateRoute';

 function App(){
  return (
    <div className="page-container">
      <Routes>
      <Route
          path="/"
          element={
            <PrivateRoute>
              <UserInfoPage />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

      </Routes>
    </div>
  );
};


export default App;