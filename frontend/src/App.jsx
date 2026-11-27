
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import CheckEmail from "./pages/CheckEmail";
import VerifyEmail from "./pages/VerifyEmail";
import TechnicianOnboarding from "./pages/technician/TechnicianOnboarding";
// import Home from "./pages/Home";
// import CustomerDashboard from "./pages/CustomerDashboard";
// import TechnicianDashboard from "./pages/TechnicianDashboard";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/check-email" element={<CheckEmail />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route
        path="/technician/onboarding"
        element={<TechnicianOnboarding />}
      />
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        {/* Add authenticated routes here */}
      </Route>

      {/* Role-specific routes */}
      <Route element={<ProtectedRoute allowedRoles={["CUSTOMER"]} />}>
        {/* Customer routes */}
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["TECHNICIAN"]} />}>
        {/* Technician routes */}
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        {/* Admin routes */}
      </Route>
    </Routes>
  );
}

export default App;
