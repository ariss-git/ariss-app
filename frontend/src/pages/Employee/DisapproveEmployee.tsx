import { disapproveArissUserAPI } from "@/api/ariss.api";
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
import { getToken } from "@clerk/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const DisapproveEmployee = ({
  onDisapproveOpen,
  setOnDisapproveOpen,
  id,
  handleFetchAllEmployee,
}: {
  onDisapproveOpen: boolean;
  setOnDisapproveOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  handleFetchAllEmployee: () => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDisapproveArissUser = async () => {
    setLoading(true);
    try {
      const token = await getToken();

      await disapproveArissUserAPI(id, token!);
      console.log("ARISS User approved");

      handleFetchAllEmployee();
      setOnDisapproveOpen(false);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={onDisapproveOpen} onOpenChange={setOnDisapproveOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Disapprove Employee</DialogTitle>
          <DialogDescription>
            Make changes to your employee profile here. Click save when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleDisapproveArissUser}>
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

export default DisapproveEmployee;
