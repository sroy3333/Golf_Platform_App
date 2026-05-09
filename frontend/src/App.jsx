import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Leaderboard from "./pages/Leaderboard";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AddScore from "./pages/AddScore";
import CreateDraw from "./pages/CreateDraw";
import RunDraw from "./pages/RunDraw";
import AddCharity from "./pages/AddCharity";
import Admin from "./pages/Admin";
import Subscription from "./pages/Subscription";
import Winners from "./pages/Winners";
import VerifyWinners from "./pages/VerifyWinners";


function App() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      

      {/* PROTECTED */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/winners" element={<Winners />} />

        {/* ADMIN ONLY */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-score"
          element={
            <ProtectedRoute adminOnly={true}>
              <AddScore />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-draw"
          element={
            <ProtectedRoute adminOnly={true}>
              <CreateDraw />
            </ProtectedRoute>
          }
      
        />

        <Route
          path="/run-draw"
          element={
            <ProtectedRoute adminOnly={true}>
              <RunDraw />
            </ProtectedRoute>
          }
      
        />

        <Route
          path="/verify-winners"
          element={
            <ProtectedRoute adminOnly={true}>
              <VerifyWinners />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-charity"
          element={
            <ProtectedRoute adminOnly={true}>
              <AddCharity />
            </ProtectedRoute>
          }
        
        />
        
      </Route>
    </Routes>
  );
}

export default App;