import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error.message);
      return;
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const data = await supabase.auth.getUser();
      setUser(data.data.user);
    };

    getUser();
  }, [user]);

  return (
    <div className="flex justify-center items-center w-full min-h-screen flex-col gap-y-6">
      <h1>{user?.id!}</h1>
      {user ? (
        <Button onClick={handleLogout}>Logout</Button>
      ) : (
        <Button asChild>
          <Link to={"/auth/sign-in"}>Login</Link>
        </Button>
      )}
    </div>
  );
};

export default Dashboard;
