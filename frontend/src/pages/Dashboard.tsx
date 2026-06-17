import { syncClerkUserAPI } from "@/api/ariss.api";
import { Button } from "@/components/ui/button";
import { getToken, SignOutButton, useUser } from "@clerk/react";
import { useEffect } from "react";

const Dashboard = () => {
  const { user } = useUser();

  const handleSyncUser = async () => {
    try {
      const token = await getToken();
      const data = {
        id: user?.id!,
        name: user?.fullName!,
        email: user?.emailAddresses[0].emailAddress!,
        profilePicUrl: user?.imageUrl! || null,
      };

      console.log(data);

      const res = await syncClerkUserAPI(data, token!);
      console.log(`${res.status} - User synched to database`);
    } catch (error: any) {
      console.log("User already exists in database");
    }
  };

  useEffect(() => {
    handleSyncUser();
  }, []);

  return (
    <div>
      <SignOutButton>
        <Button>Logout</Button>
      </SignOutButton>
    </div>
  );
};

export default Dashboard;
