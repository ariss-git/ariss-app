import { fetchAllProductsAPI } from "@/api/product.api";
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
import { Badge } from "@/components/ui/badge";
import { Filter, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  description: string;
  type: string;
  label: string;
  warranty: number;
  quantity: number;
  sku: string;
  usps: string;
  imageUrls: string[];
  filePath: string[];
  subcategoryId: string;
  subcategories: {
    name: string;
    categories: {
      name: string;
    };
  };
}

const tableHeadings = [
  { id: 1, head: "" },
  { id: 2, head: "Name" },
  { id: 3, head: "SKU" },
  { id: 4, head: "Subcategory" },
  { id: 5, head: "Category" },
  { id: 6, head: "Type" },
  { id: 7, head: "Label" },
  { id: 8, head: "Qty" },
  { id: 9, head: "Warranty" },
  { id: 10, head: "Actions" },
];

const FetchAllProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 20;

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.type.toLowerCase().includes(search.toLowerCase()) ||
      p.label.toLowerCase().includes(search.toLowerCase()) ||
      p.subcategories?.name.toLowerCase().includes(search.toLowerCase()) ||
      p.subcategories?.categories?.name
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  const paginated = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleFetchAllProducts = async () => {
    setLoading(true);
    try {
      const res = await fetchAllProductsAPI();
      console.log("Fetched Products\n", res.data.products);
      setProducts(res.data.products);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchAllProducts();
  }, []);

  return (
    <div className="flex flex-col w-full max-w-full gap-y-6 p-4 lg:p-10 overflow-hidden">
      <div className="flex justify-between items-center w-full">
        <Input
          className="lg:w-75"
          placeholder="Search product..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <div className="flex justify-end items-end w-full lg:gap-x-4">
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
                <Link to={"/subcategories"}>
                  <DropdownMenuItem>Subcategories</DropdownMenuItem>
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
                      <span>Loading products...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : paginated.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={tableHeadings.length}
                    className="text-center py-12 text-zinc-500 font-medium"
                  >
                    No products found
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map((product, index) => (
                  <TableRow
                    key={product.id}
                    className={`hover:bg-zinc-50/50 transition-colors text-center ${
                      index % 2 === 0 ? "bg-neutral-100" : "bg-white"
                    }`}
                  >
                    {/* Image */}
                    <TableCell>
                      <div className="flex justify-center">
                        <img
                          src={product.imageUrls?.[0]}
                          alt={product.name}
                          className="w-12 h-12 rounded-md object-cover border"
                        />
                      </div>
                    </TableCell>

                    {/* Name */}
                    <TableCell className="font-medium text-left whitespace-nowrap">
                      {product.name}
                    </TableCell>

                    {/* SKU */}
                    <TableCell className="text-zinc-500 whitespace-nowrap">
                      {product.sku}
                    </TableCell>

                    {/* Subcategory */}
                    <TableCell align="center">
                      <Badge variant="secondary">
                        {product.subcategories?.name ?? "—"}
                      </Badge>
                    </TableCell>

                    {/* Category */}
                    <TableCell align="center">
                      <Badge>
                        {product.subcategories?.categories?.name ?? "—"}
                      </Badge>
                    </TableCell>

                    {/* Type */}
                    <TableCell className="text-zinc-600 whitespace-nowrap">
                      {product.type}
                    </TableCell>

                    {/* Label */}
                    <TableCell className="text-zinc-600 whitespace-nowrap">
                      {product.label}
                    </TableCell>

                    {/* Quantity */}
                    <TableCell className="text-zinc-600">
                      {product.quantity}
                    </TableCell>

                    {/* Warranty */}
                    <TableCell className="text-zinc-600 whitespace-nowrap">
                      {product.warranty} yr{product.warranty !== 1 ? "s" : ""}
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <div className="flex justify-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuGroup>
                              <DropdownMenuItem>Approve</DropdownMenuItem>
                              <DropdownMenuItem>Disapprove</DropdownMenuItem>
                              <DropdownMenuItem>Update</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {paginated.length !== 0 && (
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

export default FetchAllProduct;
