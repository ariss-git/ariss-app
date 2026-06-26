import { fetchAllSubcategoryAPI } from "@/api/subcategory.api";
import { getToken } from "@clerk/react";
import { useEffect, useState } from "react";
import AddSubcategory from "./AddSubcategory";
import { Button } from "@/components/ui/button";

const FetchAllSubcategory = () => {
  const [onAddOpen, setOnAddOpen] = useState<boolean>(false);

  const handleFetchAllSubcategories = async () => {
    try {
      const token = await getToken();

      await fetchAllSubcategoryAPI(token!)
        .then((res: any) => console.log(res.data.subcategory))
        .catch((err: any) => console.log(err.message));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handleFetchAllSubcategories();
  }, []);

  return (
    <div>
      <Button
        onClick={() => {
          setOnAddOpen(true);
        }}
      >
        Add Subcategory
      </Button>

      <AddSubcategory
        onAddOpen={onAddOpen}
        setOnAddOpen={setOnAddOpen}
        fetchAllSubcategories={handleFetchAllSubcategories}
      />
    </div>
  );
};

export default FetchAllSubcategory;
