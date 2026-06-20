import { fetchSingleCustomerAPI } from "@/api/customers.api";
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
import type { CustomerType } from "@/types/customer.type";
import { getToken } from "@clerk/react";
import { useEffect, useState } from "react";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  businessName: string;
  type: string;
  profileCompleted: boolean;
  status: boolean;
  gstin: string;
  profilePicUrl: string;
  businessPicUrl: string;
  shippingAddress: {
    adr: string;
    dst: string;
    loc: string;
    pncd: string;
    stcd: string;
  };
  billingAddress: {
    adr: string;
    dst: string;
    loc: string;
    pncd: string;
    stcd: string;
  };
  createdAt: string;
}

const ViewAndUpdateCustomer = ({
  onViewOpen,
  setOnViewOpen,
  type,
  id,
}: {
  onViewOpen: boolean;
  setOnViewOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: CustomerType;
  id: string;
  //   fetchAllCustomers: () => void;
}) => {
  const [customer, setCustomer] = useState<Customer[]>([]);

  const handleFetchCustomer = async () => {
    try {
      console.log("ID: ", id);
      const token = await getToken();

      const res = await fetchSingleCustomerAPI(id, token!);
      console.log("Single\n", res.data.customer);
      setCustomer(res.data.customer);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handleFetchCustomer();
  }, [id]);

  return (
    type === "DEALER" && (
      <Dialog open={onViewOpen} onOpenChange={setOnViewOpen}>
        <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-4 border-b">
            <DialogTitle className="text-2xl font-bold">
              Customer Details
            </DialogTitle>
            <DialogDescription>
              View and update customer information.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-2">
            {/* Basic Information */}
            <div className="border rounded-xl overflow-hidden">
              <div className="px-4 py-3 bg-muted border-b">
                <h3 className="font-semibold">Basic Information</h3>
              </div>

              <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label className="mb-2">Unique ID</Label>
                  <Input value={customer[0]?.id ?? ""} readOnly />
                </div>

                <div>
                  <Label className="mb-2">Name</Label>
                  <Input value={customer[0]?.name ?? ""} readOnly />
                </div>

                <div>
                  <Label className="mb-2">Email</Label>
                  <Input value={customer[0]?.email ?? ""} readOnly />
                </div>

                <div>
                  <Label className="mb-2">Phone</Label>
                  <Input value={customer[0]?.phone ?? ""} readOnly />
                </div>

                <div>
                  <Label className="mb-2">Business Name</Label>
                  <Input value={customer[0]?.businessName ?? ""} readOnly />
                </div>

                <div>
                  <Label className="mb-2">GSTIN</Label>
                  <Input value={customer[0]?.gstin ?? ""} readOnly />
                </div>

                <div>
                  <Label className="mb-2">Type</Label>
                  <Input value={customer[0]?.type ?? ""} readOnly />
                </div>

                <div>
                  <Label className="mb-2">Status</Label>
                  <Input
                    value={customer[0]?.status ? "Active" : "Inactive"}
                    readOnly
                  />
                </div>

                <div>
                  <Label className="mb-2">Profile Completed</Label>
                  <Input
                    value={customer[0]?.profileCompleted ? "Yes" : "No"}
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="border rounded-xl overflow-hidden">
              <div className="px-4 py-3 bg-muted border-b">
                <h3 className="font-semibold">Shipping Address</h3>
              </div>

              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2">Address</Label>
                  <Input
                    value={customer[0]?.shippingAddress?.adr ?? ""}
                    readOnly
                  />
                </div>

                <div>
                  <Label className="mb-2">District</Label>
                  <Input
                    value={customer[0]?.shippingAddress?.dst ?? ""}
                    readOnly
                  />
                </div>

                <div>
                  <Label className="mb-2">Location</Label>
                  <Input
                    value={customer[0]?.shippingAddress?.loc ?? ""}
                    readOnly
                  />
                </div>

                <div>
                  <Label className="mb-2">Pincode</Label>
                  <Input
                    value={customer[0]?.shippingAddress?.pncd ?? ""}
                    readOnly
                  />
                </div>

                <div className="md:col-span-2">
                  <Label className="mb-2">State</Label>
                  <Input
                    value={customer[0]?.shippingAddress?.stcd ?? ""}
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div className="border rounded-xl overflow-hidden">
              <div className="px-4 py-3 bg-muted border-b">
                <h3 className="font-semibold">Billing Address</h3>
              </div>

              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2">Address</Label>
                  <Input
                    value={customer[0]?.billingAddress?.adr ?? ""}
                    readOnly
                  />
                </div>

                <div>
                  <Label className="mb-2">District</Label>
                  <Input
                    value={customer[0]?.billingAddress?.dst ?? ""}
                    readOnly
                  />
                </div>

                <div>
                  <Label className="mb-2">Location</Label>
                  <Input
                    value={customer[0]?.billingAddress?.loc ?? ""}
                    readOnly
                  />
                </div>

                <div>
                  <Label className="mb-2">Pincode</Label>
                  <Input
                    value={customer[0]?.billingAddress?.pncd ?? ""}
                    readOnly
                  />
                </div>

                <div className="md:col-span-2">
                  <Label className="mb-2">State</Label>
                  <Input
                    value={customer[0]?.billingAddress?.stcd ?? ""}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="pt-4 border-t">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit">Update Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  );
};

export default ViewAndUpdateCustomer;
