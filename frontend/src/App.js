import { Routes, Route } from "react-router-dom";
import { UserInfoPage } from "./pages/UserInfoPage";

 function App(){
  return (
    <div className="page-container">
      <Routes>
        <Route path="/" element={<UserInfoPage />} />
      </Routes>
    </div>
  );
};


export default App;