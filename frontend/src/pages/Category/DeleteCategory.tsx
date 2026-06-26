import { deleteCategoryAPI, fetchSingleCategoryAPI } from "@/api/category.api";
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

// interface SingleCategory {
//   id: string;
//   imageUrl: string;
// }

const DeleteCategory = ({
  id,
  fetchAllCategories,
  onDeleteOpen,
  setOnDeleteOpen,
}: {
  id: string;
  fetchAllCategories: () => void;
  onDeleteOpen: boolean;
  setOnDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleFetchImageUrl = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      await fetchSingleCategoryAPI(id, token!)
        .then((res: any) => {
          console.log("Image URL: ", res.data.category?.imageUrl!);
          setImageUrl(res.data.category?.imageUrl!);
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

      await deleteCategoryAPI(id, token!)
        .then(() => {
          const res = handleImageDelete(imageUrl, "categories");
          console.log("Image delete response: ", res);
          console.log("Category deleted successfully");
        })
        .catch((err) => console.log(err.message))
        .finally(() => fetchAllCategories());
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchImageUrl();
  }, [id]);

  return (
    <AlertDialog open={onDeleteOpen} onOpenChange={setOnDeleteOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            category from our servers.
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

export default DeleteCategory;
