import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/react";
import { useEffect } from "react";

const handleSyncUser = async () => {};

useEffect(() => {
  handleSyncUser();
}, []);

const Dashboard = () => {
  return (
    <div>
      <SignOutButton>
        <Button>Logout</Button>
      </SignOutButton>
    </div>
  );
};

export default Dashboard;
