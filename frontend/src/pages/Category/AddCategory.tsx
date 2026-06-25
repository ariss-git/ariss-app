import { addCategoryAPI } from "@/api/category.api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleImageUpload } from "@/util/uploadImageToSupabase";
import { getToken } from "@clerk/react";
import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";

const AddCategory = ({
  fetchAllCategories,
}: {
  fetchAllCategories: () => void;
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const handleAddCategory = async () => {
    setLoading(true);
    try {
      const imageUrl = await handleImageUpload(image, "categories");
      const token = await getToken();

      const data = { name, imageUrl };

      await addCategoryAPI(data, token!)
        .then(() => {
          fetchAllCategories();
        })
        .catch((err) => console.log(err.message));
      console.log("New category added");

      setName("");
      setImage(null);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle size={8} /> Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Create new category for products and subcategories here. Click save
            when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-start items-start w-full flex-col lg:gap-y-6">
          <div className="flex justify-start items-start w-full flex-col lg:gap-y-2">
            <Label>Category Name</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Router"
            />
          </div>
          <div className="flex justify-start items-start w-full lg:gap-y-2 flex-col">
            <Label>Category Image</Label>
            <Input
              type="file"
              accept="image/*"
              className="cursor-pointer"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  setImage(file);
                }
              }}
            />
          </div>
        </div>

        <DialogFooter className="lg:mt-6">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleAddCategory}>
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Save changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategory;
