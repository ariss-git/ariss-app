import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { useUser } from "@clerk/react";
import { Loader2 } from "lucide-react";
import Login from "./pages/Login";
import SSOCallback from "./callback/sso-callback";

const App = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isSignedIn ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />
        <Route path="/sso-callback" element={<SSOCallback />} />
        <Route
          path="/login"
          element={isSignedIn ? <Navigate to="/" replace /> : <Login />}
        />
      </Routes>
    </Router>
  );
};

export default App;
