import { disapproveCustomerAPI } from "@/api/customers.api";
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

const DisapproveCustomer = ({
  onDisapproveOpen,
  setOnDisapproveOpen,
  id,
  fetchAllCustomers,
}: {
  onDisapproveOpen: boolean;
  setOnDisapproveOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  fetchAllCustomers: () => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDisapprove = async () => {
    setLoading(true);
    try {
      const token = await getToken();

      await disapproveCustomerAPI(id, token!);
      console.log("Customer disapproved");

      setOnDisapproveOpen(false);
      fetchAllCustomers();
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={onDisapproveOpen} onOpenChange={setOnDisapproveOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>DIapprove Customer Account</AlertDialogTitle>
          <AlertDialogDescription>
            Please make sure that customer has completed their profile before
            disapproving, though you can approve any time.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDisapprove}>
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Disapprove"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DisapproveCustomer;
