import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "../pages/Welcome";
import ForCompanies from "../pages/ForCompanies";

const AppRoutes = () => {
  return (  
    <Router>
      <Routes>
        <Route path="/welcome" element={<Welcome />}/>
        <Route path="/forcompanies" element={<ForCompanies />}/>
      </Routes>
    </Router>
  );
}
 
export default AppRoutes;