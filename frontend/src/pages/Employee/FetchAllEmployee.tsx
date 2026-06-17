import { fetchAllArissUsersAPI } from "@/api/ariss.api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ArissUser } from "@/types/ariss.type";
import { getToken } from "@clerk/react";
import { Filter, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import DeleteEmployee from "./DeleteEmployee";
import ApproveEmployee from "./ApproveEmployee";
import DisapproveEmployee from "./DisapproveEmployee";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type typeType = "SUPER" | "ADMIN" | "MODERATOR";

const tableHeadings = [
  {
    id: 1,
    head: "Status",
  },
  {
    id: 2,
    head: "Role",
  },
  {
    id: 3,
    head: "Name",
  },
  {
    id: 4,
    head: "Email",
  },
  {
    id: 5,
    head: "Joined",
  },
];

const FetchAllEmployee = () => {
  const [type, setType] = useState<typeType | null>(null);

  const [users, setUsers] = useState<ArissUser[]>([]);
  const [id, setId] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 20;

  const [loading, setLoading] = useState<boolean>(false);
  const [onDeleteOpen, setOnDeleteOpen] = useState<boolean>(false);
  const [onApproveOpen, setOnApproveOpen] = useState<boolean>(false);
  const [onDisapproveOpen, setOnDisapproveOpen] = useState<boolean>(false);

  const filteredUser = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.type.toLowerCase().includes(search.toLowerCase()) ||
      user.createdAt.toLowerCase().includes(search.toLowerCase()) ||
      new Date(user.createdAt)
        .toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  const pagination = filteredUser.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const totalPages = Math.ceil(filteredUser.length / itemsPerPage);

  const handleFetchAllEmployee = async () => {
    setLoading(true);
    try {
      const token = await getToken();

      const res = await fetchAllArissUsersAPI(type, token!);
      setUsers(res.data.ariss);
      console.log(res.data.ariss);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchAllEmployee();
  }, [type]);

  return (
    <div className="flex flex-col w-full max-w-full gap-y-6 p-4 lg:p-10 overflow-hidden">
      <div className="flex justify-between items-center w-full">
        <Input
          className="lg:w-[300px]"
          placeholder="Search for employee..."
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
              <DropdownMenuItem onClick={() => setType("ADMIN")}>
                All Admin
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setType("MODERATOR")}>
                All Moderator
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setType(null)}>
                All Employee
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="w-full max-w-full bg-white rounded-xl border border-zinc-200/80 shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table className="w-full p-4">
            <TableHeader className="bg-zinc-50/70 subtle-bottom-border">
              <TableRow className="hover:bg-transparent">
                {tableHeadings.map((heading) => (
                  <TableHead
                    key={heading.id}
                    className="text-center font-semibold text-zinc-700 py-4 px-6 whitespace-nowrap"
                  >
                    {heading.head}
                  </TableHead>
                ))}
                <TableHead className="text-end font-semibold text-zinc-700 py-4 px-6 whitespace-nowrap">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={tableHeadings.length}
                    className="text-center py-10 text-zinc-400"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin" />
                      <span>Loading employee database...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : pagination.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={tableHeadings.length + 1}
                    className="text-center py-12 text-zinc-500 font-medium"
                  >
                    No employees found
                  </TableCell>
                </TableRow>
              ) : (
                pagination.map((user, index) => (
                  <TableRow
                    key={user.id}
                    className={`hover:bg-zinc-50/50 transition-colors text-center ${
                      index % 2 === 0 ? "bg-neutral-100" : "bg-white"
                    }`}
                  >
                    {/* Status */}
                    <TableCell>
                      <Badge variant={user.status ? "default" : "destructive"}>
                        {user.status ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>

                    {/* Type */}
                    <TableCell>
                      {user.type ? (
                        <Badge variant="secondary">{user.type}</Badge>
                      ) : (
                        <Badge variant="ghost">-</Badge>
                      )}
                    </TableCell>

                    {/* Name */}
                    <TableCell className="font-medium w-2 truncate">
                      {user.name}
                    </TableCell>

                    {/* Email */}
                    <TableCell className="text-zinc-600">
                      {user.email}
                    </TableCell>

                    {/* Joined */}
                    <TableCell className="text-zinc-600">
                      {new Date(user.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>

                    {/* Actions */}
                    <TableCell align="center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1.5 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 rounded-lg transition-colors inline-flex items-center justify-center cursor-pointer">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => {
                              setId(user.id!);
                              setOnApproveOpen(true);
                            }}
                          >
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setId(user.id!);
                              setOnDisapproveOpen(true);
                            }}
                          >
                            Disapprove
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setId(user.id!);
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
      <DeleteEmployee
        onDeleteOpen={onDeleteOpen}
        setOnDeleteOpen={setOnDeleteOpen}
        id={id}
        handleFetchAllEmployee={handleFetchAllEmployee}
      />
      <ApproveEmployee
        onApproveOpen={onApproveOpen}
        setOnApproveOpen={setOnApproveOpen}
        id={id}
        handleFetchAllEmployee={handleFetchAllEmployee}
      />
      <DisapproveEmployee
        onDisapproveOpen={onDisapproveOpen}
        setOnDisapproveOpen={setOnDisapproveOpen}
        id={id}
        handleFetchAllEmployee={handleFetchAllEmployee}
      />
    </div>
  );
};

export default FetchAllEmployee;
