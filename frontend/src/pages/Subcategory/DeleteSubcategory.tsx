import {
  deleteSubcategoryAPI,
  fetchSingleSubcategoryAPI,
} from "@/api/subcategory.api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { handleImageDelete } from "@/util/deleteImageFromSupabase";
import { getToken } from "@clerk/react";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const DeleteSubcategory = ({
  id,
  fetchAllSubcategories,
  onDeleteOpen,
  setOnDeleteOpen,
}: {
  id: string;
  fetchAllSubcategories: () => void;
  onDeleteOpen: boolean;
  setOnDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [filePath, setFilePath] = useState<string>("");

  const handleFetchFilePath = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      await fetchSingleSubcategoryAPI(id, token!)
        .then((res: any) => {
          console.log("File path: ", res.data.subcategory?.filePath!);
          setFilePath(res.data.subcategory?.filePath!);
        })
        .catch((err: any) => console.log(err.message));
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const token = await getToken();

      await deleteSubcategoryAPI(id, token!);
      const res = await handleImageDelete("subcategories", filePath);
      console.log("Image delete response: ", res);
      console.log("Subcategory deleted successfully");
    } catch (error: any) {
      console.log(error.message);
    } finally {
      fetchAllSubcategories();
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchFilePath();
  }, [onDeleteOpen]);

  return (
    <AlertDialog open={onDeleteOpen} onOpenChange={setOnDeleteOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            subcategory from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} variant="destructive">
            {loading ? <Loader2 /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSubcategory;
