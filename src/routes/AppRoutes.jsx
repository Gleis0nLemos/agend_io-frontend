import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "../pages/Home";
import Welcome from "../pages/Welcome";

const AppRoutes = () => {
  return (  
    <Router>
      <Routes>
        <Route path="/welcome" element={<Welcome />}/>
      </Routes>
    </Router>
  );
}
 
export default AppRoutes;