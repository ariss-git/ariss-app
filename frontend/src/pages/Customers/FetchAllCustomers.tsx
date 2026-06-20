import { fetchAllCustomersAPI } from "@/api/customers.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { CustomerType } from "@/types/customer.type";
import { getToken } from "@clerk/react";
import { Filter, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ViewAndUpdateCustomer from "./ViewAndUpdateCustomer";
import DeleteCustomer from "./DeleteCustomer";

interface Customers {
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
  dealer: {
    businessName: string;
    businessPicUrl: string;
  };
  createdAt: string;
}

const FetchAllCustomers = () => {
  const [type, setType] = useState<CustomerType>("DEALER");

  const [customers, setCustomers] = useState<Customers[]>([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [onViewOpen, setOnViewOpen] = useState<boolean>(false);
  const [onDeleteOpen, setOnDeleteOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const handleFetchAllCustomers = async () => {
    setLoading(true);

    try {
      const token = await getToken();

      const res = await fetchAllCustomersAPI(type, token!);
      setCustomers(res.data.customers);
      console.log(res.data.customers);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchAllCustomers();
  }, [type]);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name?.toLowerCase().includes(search.toLowerCase()) ||
      customer.businessName?.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone?.toLowerCase().includes(search.toLowerCase()) ||
      customer.type?.toLowerCase().includes(search.toLowerCase()) ||
      new Date(customer.createdAt)
        .toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  const pagination = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  return (
    <div className="flex flex-col w-full max-w-full gap-y-6 p-4 lg:p-10 overflow-hidden">
      <div className="flex justify-between items-center w-full">
        <Input
          className="lg:w-[300px]"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="w-4 h-4 stroke-1" /> Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Fetch</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setType("DEALER")}>
                All Dealers
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setType("TECHNICIAN")}>
                All Technicians
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setType("BACKOFFICE")}>
                All Back offices
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setType(null)}>
                All Customers
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="w-full max-w-full bg-white rounded-xl border border-zinc-200/80 shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table className="w-full">
            <TableHeader className="bg-black hover:bg-black subtle-bottom-border">
              <TableRow>
                <TableHead className="text-left font-semibold text-neutral-100 py-4 px-6 whitespace-nowrap" />
                <TableHead className="text-left font-semibold text-neutral-100 py-4 px-6 whitespace-nowrap">
                  Business
                </TableHead>
                <TableHead className="text-left font-semibold text-neutral-100 py-4 px-6 whitespace-nowrap">
                  GSTIN
                </TableHead>
                <TableHead className="text-left font-semibold text-neutral-100 py-4 px-6 whitespace-nowrap">
                  Type
                </TableHead>
                <TableHead className="text-left font-semibold text-neutral-100 py-4 px-6 whitespace-nowrap">
                  Status
                </TableHead>
                <TableHead className="text-left font-semibold text-neutral-100 py-4 px-6 whitespace-nowrap">
                  Name
                </TableHead>
                <TableHead className="text-left font-semibold text-neutral-100 py-4 px-6 whitespace-nowrap">
                  Phone
                </TableHead>
                <TableHead className="text-left font-semibold text-neutral-100 py-4 px-6 whitespace-nowrap">
                  Profile
                </TableHead>
                <TableHead className="text-left font-semibold text-neutral-100 py-4 px-6 whitespace-nowrap">
                  Shipping Address
                </TableHead>
                <TableHead className="text-left font-semibold text-neutral-100 py-4 px-6 whitespace-nowrap">
                  Billing Address
                </TableHead>
                <TableHead className="text-left font-semibold text-neutral-100 py-4 px-6 whitespace-nowrap">
                  Joined
                </TableHead>
                <TableHead className="text-right font-semibold text-neutral-100 py-4 px-6 whitespace-nowrap">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-10 text-zinc-400"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin" />
                      <span>Loading customers...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : pagination.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-12 text-zinc-500 font-medium"
                  >
                    No customers found
                  </TableCell>
                </TableRow>
              ) : (
                pagination.map((customer, index) => (
                  <TableRow
                    key={customer.id}
                    className={`hover:bg-zinc-50/50 transition-colors text-center ${
                      index % 2 === 0 ? "bg-neutral-100" : "bg-white"
                    }`}
                  >
                    {/* {customer.type === "DEALER" ? (
                      <TableCell><img
                        src={customer.businessPicUrl}
                        alt="Business Pic"
                        width={40}
                        height={40}
                      /></TableCell>
                    ) : (
                      <TableCell>
                        <img
                        src={customer.dealer.businessPicUrl}
                        alt="Business Pic"
                        width={40}
                        height={40}
                      />
                      </TableCell>
                    )} */}
                    <TableCell>
                      <img
                        src={customer.businessPicUrl}
                        alt="Business Pic"
                        width={55}
                        height={55}
                      />
                    </TableCell>
                    {/* {customer.type === "DEALER" ? (
                      <TableCell>{customer.businessName || "-"}</TableCell>
                    ) : (
                      <TableCell>
                        {customer.dealer.businessName || "-"}
                      </TableCell>
                    )} */}
                    <TableCell>{customer.businessName || "-"}</TableCell>

                    <TableCell>{customer.gstin || "-"}</TableCell>

                    <TableCell>
                      {customer.type ? (
                        <Badge variant="ghost" className="cursor-default">
                          {customer.type}
                        </Badge>
                      ) : (
                        <Badge variant="ghost">-</Badge>
                      )}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={customer.status ? "default" : "destructive"}
                      >
                        {customer.status ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>

                    <TableCell className="font-medium">
                      {customer.name}
                    </TableCell>

                    <TableCell>{customer.phone || "-"}</TableCell>

                    <TableCell>
                      <Badge
                        variant={
                          customer.profileCompleted ? "default" : "outline"
                        }
                      >
                        {customer.profileCompleted ? "Completed" : "Incomplete"}
                      </Badge>
                    </TableCell>

                    {customer.shippingAddress ? (
                      <TableCell className="text-xs lg:px-6">
                        {customer.shippingAddress.adr},{" "}
                        {customer.shippingAddress.dst},{" "}
                        {customer.shippingAddress.loc},{" "}
                        {customer.shippingAddress.stcd} -{" "}
                        {customer.shippingAddress.pncd}
                      </TableCell>
                    ) : (
                      <TableCell>-</TableCell>
                    )}

                    {customer.billingAddress ? (
                      <TableCell className="text-xs lg:px-6">
                        {customer.billingAddress.adr},{" "}
                        {customer.billingAddress.dst},{" "}
                        {customer.billingAddress.loc},{" "}
                        {customer.billingAddress.stcd} -{" "}
                        {customer.billingAddress.pncd}
                      </TableCell>
                    ) : (
                      <TableCell>-</TableCell>
                    )}

                    <TableCell className="text-zinc-600 cursor-default">
                      {new Date(customer.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </TableCell>

                    <TableCell align="center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1.5 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 rounded-lg transition-colors inline-flex items-center justify-center cursor-pointer">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Approve</DropdownMenuItem>
                          <DropdownMenuItem>Disapprove</DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setId(customer.id);
                              setOnViewOpen(true);
                            }}
                          >
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setId(customer.id);
                              setOnDeleteOpen(true);
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <ViewAndUpdateCustomer
            id={id}
            onViewOpen={onViewOpen}
            setOnViewOpen={setOnViewOpen}
            type={type}
          />

          <DeleteCustomer
            onDeleteOpen={onDeleteOpen}
            setOnDeleteOpen={setOnDeleteOpen}
            id={id}
            fetchAllCustomers={handleFetchAllCustomers}
          />

          {pagination.length !== 0 && (
            <Pagination className="mt-6 mb-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={currentPage === index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
};

export default FetchAllCustomers;
