import { Routes, Route } from "react-router-dom";

import { UserInfoPage } from "./pages/UserInfoPage";
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from "./pages/SignUpPage";
import { PleaseVerifyEmailPage } from "./pages/PleaseVerifyEmailPage";
import { EmailVerificationLandingPage } from "./pages/EmailVerificationLandingPage";
import { PasswordResetLandinPage } from "./pages/PasswordResetLandingPage";


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
        <Route path="/please-verify" element={<PleaseVerifyEmailPage />} />
        <Route path="/verify-email/:verificationString" element={<EmailVerificationLandingPage />} />
        <Route path="/reset-password/:passwordResetCode" element={<PasswordResetLandinPage />} />
      </Routes>
    </div>
  );
};


export default App;