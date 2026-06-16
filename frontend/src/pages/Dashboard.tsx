import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/react";

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
