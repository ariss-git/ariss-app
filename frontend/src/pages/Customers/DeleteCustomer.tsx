import { deleteCustomerAPI } from "@/api/customers.api";
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

const DeleteCustomer = ({
  onDeleteOpen,
  setOnDeleteOpen,
  id,
  fetchAllCustomers,
}: {
  onDeleteOpen: boolean;
  setOnDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  fetchAllCustomers: () => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const token = await getToken();

      await deleteCustomerAPI(id, token!);
      console.log("Customer deleted");

      setOnDeleteOpen(false);
      fetchAllCustomers();
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
            customer from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} variant="destructive">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCustomer;
