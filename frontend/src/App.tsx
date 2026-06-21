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
import MainLayout from "./components/custom/layout/MainLayout";
import FetchAllEmployee from "./pages/Employee/FetchAllEmployee";
import FetchAllCustomers from "./pages/Customers/FetchAllCustomers";
import FetchAllCategory from "./pages/Category/FetchAllCategory";
import FetchAllProduct from "./pages/Product/FetchAllProduct";

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
            isSignedIn ? <MainLayout /> : <Navigate to="/login" replace />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/employee" element={<FetchAllEmployee />} />
          <Route path="/customers" element={<FetchAllCustomers />} />
          <Route path="/categories" element={<FetchAllCategory />} />
          <Route path="/products" element={<FetchAllProduct />} />
        </Route>
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
