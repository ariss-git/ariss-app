import { fetchAllArissUsersAPI } from "@/api/ariss.api";
import type { ArissUser } from "@/types/ariss.type";
import { getToken } from "@clerk/react";
import { useEffect, useState } from "react";

type typeType = "SUPER" | "ADMIN" | "MODERATOR";

const FetchAllEmployee = () => {
  const [type, setType] = useState<typeType | null>(null);

  const [users, setUsers] = useState<ArissUser[]>([]);

  const handleFetchAllEmployee = async () => {
    try {
      const token = await getToken();

      const res = await fetchAllArissUsersAPI(type, token!);
      setUsers(res.data.ariss);
      console.log(res.data.ariss);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handleFetchAllEmployee();
  }, [type]);

  return (
    <div>
      {users.map((user) => (
        <h1 key={user.id}>{user.name}</h1>
      ))}
    </div>
  );
};

export default FetchAllEmployee;
