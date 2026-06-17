import { approveArissUserAPI } from "@/api/ariss.api";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getToken } from "@clerk/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const ApproveEmployee = ({
  onApproveOpen,
  setOnApproveOpen,
  id,
  handleFetchAllEmployee,
}: {
  onApproveOpen: boolean;
  setOnApproveOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  handleFetchAllEmployee: () => void;
}) => {
  const [type, setType] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const handleApproveArissUser = async () => {
    setLoading(true);
    try {
      const token = await getToken();

      await approveArissUserAPI(id, type, token!);
      console.log("ARISS User approved");

      handleFetchAllEmployee();
      setType("");
      setOnApproveOpen(false);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={onApproveOpen} onOpenChange={setOnApproveOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Approve Employee</DialogTitle>
          <DialogDescription>
            Make changes to your employee profile here. Click save when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Roles</SelectLabel>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="MODERATOR">Moderator</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleApproveArissUser}>
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

export default ApproveEmployee;
