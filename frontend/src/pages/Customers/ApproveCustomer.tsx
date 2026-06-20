import { approveCustomerAPI } from "@/api/customers.api";
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

const ApproveCustomer = ({
  onApproveOpen,
  setOnApproveOpen,
  id,
  fetchAllCustomers,
}: {
  onApproveOpen: boolean;
  setOnApproveOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  fetchAllCustomers: () => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleApprove = async () => {
    setLoading(true);
    try {
      const token = await getToken();

      await approveCustomerAPI(id, token!);
      console.log("Customer approved");

      setOnApproveOpen(false);
      fetchAllCustomers();
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={onApproveOpen} onOpenChange={setOnApproveOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Approve Customer Account</AlertDialogTitle>
          <AlertDialogDescription>
            Please make sure that customer has completed their profile before
            approving, though you can disapprove any time.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleApprove}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Approve"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ApproveCustomer;
