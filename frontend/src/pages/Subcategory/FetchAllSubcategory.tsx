import { fetchAllSubcategoryAPI } from "@/api/subcategory.api";
import { getToken } from "@clerk/react";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Filter, MoreHorizontal, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import AddSubcategory from "./AddSubcategory";

interface Subcategory {
  categories: { name: string };
  categoryId: string;
  createdAt: string;
  filePath: string;
  id: string;
  imageUrl: string;
  name: string;
}

const tableHeadings = [
  { id: 1, head: "Image" },
  { id: 2, head: "Name" },
  { id: 3, head: "Category" },
  { id: 4, head: "Created At" },
];

const FetchAllSubcategory = () => {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [onAddOpen, setOnAddOpen] = useState<boolean>(false);

  const itemsPerPage = 20;

  const filteredSubcategories = subcategories.filter(
    (sub) =>
      sub.name.toLowerCase().includes(search.toLowerCase()) ||
      sub.categories?.name.toLowerCase().includes(search.toLowerCase()) ||
      sub.createdAt.toLowerCase().includes(search.toLowerCase()) ||
      new Date(sub.createdAt)
        .toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  const pagination = filteredSubcategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(filteredSubcategories.length / itemsPerPage);

  const handleFetchAllSubcategories = async () => {
    setLoading(true);
    try {
      const token = await getToken();

      const res = await fetchAllSubcategoryAPI(token!);

      console.log("Fetched Subcategories\n", res.data.subcategory);

      setSubcategories(res.data.subcategory);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchAllSubcategories();
  }, []);

  return (
    <div className="flex flex-col w-full max-w-full gap-y-6 p-4 lg:p-10 overflow-hidden">
      <div className="flex justify-between items-center w-full">
        <Input
          className="lg:w-75"
          placeholder="Search subcategory..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <div className="flex justify-end items-end w-full lg:gap-x-4">
          <Button
            onClick={() => {
              setOnAddOpen(true);
            }}
          >
            <PlusCircle size={8} /> Subcategory
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="w-4 h-4 stroke-1" /> Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Stocks</DropdownMenuLabel>
                <Link to={"/categories"}>
                  <DropdownMenuItem>Categories</DropdownMenuItem>
                </Link>
                <Link to={"/products"}>
                  <DropdownMenuItem>Products</DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="w-full max-w-full bg-white rounded-xl border border-zinc-200/80 shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table className="w-full p-4">
            <TableHeader className="bg-black hover:bg-black subtle-bottom-border">
              <TableRow className="hover:bg-transparent">
                {tableHeadings.map((heading) => (
                  <TableHead
                    key={heading.id}
                    className="text-center font-semibold text-neutral-100 py-4 px-6 whitespace-nowrap"
                  >
                    {heading.head}
                  </TableHead>
                ))}
                <TableHead className="text-center font-semibold text-neutral-100 py-4 px-6 whitespace-nowrap">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={tableHeadings.length + 1}
                    className="text-center py-10 text-zinc-400"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin" />
                      <span>Loading subcategories...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : pagination.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={tableHeadings.length + 1}
                    className="text-center py-12 text-zinc-500 font-medium"
                  >
                    No subcategories found
                  </TableCell>
                </TableRow>
              ) : (
                pagination.map((sub, index) => (
                  <TableRow
                    key={sub.id}
                    className={`hover:bg-zinc-50/50 transition-colors text-center ${
                      index % 2 === 0 ? "bg-neutral-100" : "bg-white"
                    }`}
                  >
                    {/* Image */}
                    <TableCell>
                      <div className="flex justify-center">
                        <img
                          src={sub.imageUrl}
                          alt={sub.name}
                          className="w-12 h-12 rounded-md object-cover border"
                        />
                      </div>
                    </TableCell>

                    {/* Name */}
                    <TableCell className="font-medium">{sub.name}</TableCell>

                    {/* Category */}
                    <TableCell className="text-zinc-600">
                      {sub.categories?.name ?? "—"}
                    </TableCell>

                    {/* Created At */}
                    <TableCell className="text-zinc-600">
                      {new Date(sub.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1.5 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 rounded-lg transition-colors inline-flex items-center justify-center cursor-pointer">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Update</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
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

          {/* Add Subcategory Dialog */}
          <AddSubcategory
            onAddOpen={onAddOpen}
            setOnAddOpen={setOnAddOpen}
            fetchAllSubcategories={handleFetchAllSubcategories}
          />
        </div>
      </div>
    </div>
  );
};

export default FetchAllSubcategory;
