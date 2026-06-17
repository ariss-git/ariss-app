import { deleteArissUserAPI } from "@/api/ariss.api";
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
import { getToken } from "@clerk/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const DeleteEmployee = ({
  onDeleteOpen,
  setOnDeleteOpen,
  id,
  handleFetchAllEmployee,
}: {
  onDeleteOpen: boolean;
  setOnDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  handleFetchAllEmployee: () => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteArissUser = async () => {
    setLoading(true);
    try {
      const token = await getToken();

      await deleteArissUserAPI(id, token!);
      console.log("ARISS User deleted");

      handleFetchAllEmployee();
      setOnDeleteOpen(false);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={onDeleteOpen} onOpenChange={setOnDeleteOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteArissUser}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEmployee;
