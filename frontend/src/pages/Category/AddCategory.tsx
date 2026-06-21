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
import { PlusCircle } from "lucide-react";

const AddCategory = () => {
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
            <Input type="text" placeholder="Router" />
          </div>
          <div className="flex justify-start items-start w-full lg:gap-y-2 flex-col">
            <Label>Category Image</Label>
            <Input className="cursor-pointer" type="file" />
          </div>
        </div>

        <DialogFooter className="lg:mt-6">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategory;
