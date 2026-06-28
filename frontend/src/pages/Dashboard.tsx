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

      await syncClerkUserAPI(data, token!)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err: any) => {
          console.error(err.response.data.error);
        });
    } catch (error: any) {
      console.log("Error in sync user", error);
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
