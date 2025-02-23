import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProtectedRoute from "./pages/ProtectedRoute";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
   
  );
}

export default App;
