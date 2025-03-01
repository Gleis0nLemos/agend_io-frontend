import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "../pages/Welcome";
import ForCompanies from "../pages/ForCompanies";
import Home from "../pages/Home"


const AppRoutes = () => {
  return (  
    <Router>
      <Routes>
        <Route path="/welcome" element={<Welcome />}/>
        <Route path="/forcompanies" element={<ForCompanies />}/>
        <Route path="/home/:id" element={<Home />}/>
      </Routes>
    </Router>
  );
}
 
export default AppRoutes;