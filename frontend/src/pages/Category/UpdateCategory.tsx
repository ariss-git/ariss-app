import { fetchSingleCategoryAPI, updateCategoryAPI } from "@/api/category.api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleImageDelete } from "@/util/deleteImageFromSupabase";
import { handleImageUpload } from "@/util/uploadImageToSupabase";
import { getToken } from "@clerk/react";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const UpdateCategory = ({
  id,
  fetchAllCategories,
  onUpdateOpen,
  setonUpdateOpen,
}: {
  id: string;
  fetchAllCategories: () => void;
  onUpdateOpen: boolean;
  setonUpdateOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [filePath, setFilePath] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchFilePath = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      await fetchSingleCategoryAPI(id, token!)
        .then((res: any) => {
          console.log("File path: ", res.data.category?.filePath!);
          setFilePath(res.data.category?.filePath!);
          setName(res.data.category?.name!);
        })
        .catch((err: any) => console.log(err.message));
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const { publicUrl: imageUrl, filePath: updatedPath } =
        await handleImageUpload(image, "categories");

      const data = { name, imageUrl, filePath: updatedPath };

      await updateCategoryAPI(id, data, token!)
        .then(() => {
          handleImageDelete("categories", filePath);
          console.log("Category updated successfully");
        })
        .catch((err) => console.log(err.message))
        .finally(() => fetchAllCategories());

      setName("");
      setImage(null);

      setonUpdateOpen(false);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchFilePath();
  }, [onUpdateOpen]);

  return (
    <Dialog open={onUpdateOpen} onOpenChange={setonUpdateOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
          <DialogDescription>Update the category details.</DialogDescription>
        </DialogHeader>
        <div className="flex justify-start flex-col items-start w-full lg:gap-y-6">
          <div className="flex justify-start flex-col items-start w-full lg:gap-y-4">
            <Label>Category Name</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Switch"
            />
          </div>
          <div className="flex justify-start flex-col items-start w-full lg:gap-y-4">
            <Label>Category Image</Label>
            <Input
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  setImage(file);
                }
              }}
              type="file"
              accept="image/*"
              className="cursor-pointer"
            />
          </div>
        </div>

        <DialogFooter className="lg:mt-6">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleUpdate}>
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Update changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCategory;
