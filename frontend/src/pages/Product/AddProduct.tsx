import { fetchAllSubcategoryAPI } from "@/api/subcategory.api";
import { addProductAPI } from "@/api/product.api";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { handleImageUpload } from "@/util/uploadImageToSupabase";
import { getToken } from "@clerk/react";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Subcategory {
  id: string;
  name: string;
  categories?: {
    name: string;
  };
}

const AddProduct = ({
  addOnOpen,
  setOnAddOpen,
  fetchAllProducts,
}: {
  addOnOpen: boolean;
  setOnAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetchAllProducts: () => void;
}) => {
  // Form state
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [warranty, setWarranty] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [sku, setSku] = useState<string>("");
  const [usps, setUsps] = useState<string>("");
  const [subcategoryId, setSubcategoryId] = useState<string>("");

  // Files state
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [manualFiles, setManualFiles] = useState<File[]>([]);

  // Other state
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Predefined options
  const productTypes = [
    "Networking",
    "Electronics",
    "Accessories",
    "Security",
    "Smart Home",
  ];

  const productLabels = [
    "New Tech",
    "Top Rated",
    "Best Seller",
    "Hot",
    "Standard",
  ];

  const handleFetchAllSubcategories = async () => {
    try {
      const token = await getToken();
      const res = await fetchAllSubcategoryAPI(token!);
      setSubcategories(res.data.subcategory || []);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (addOnOpen) {
      handleFetchAllSubcategories();
    }
  }, [addOnOpen]);

  const handleAddProduct = async () => {
    setLoading(true);
    try {
      // 1. Upload images
      const imageUrls: string[] = [];
      for (const file of imageFiles) {
        const uploadRes = await handleImageUpload(file, "products");
        imageUrls.push(uploadRes.publicUrl);
      }

      // 2. Upload manual/files
      const filePath: string[] = [];
      for (const file of manualFiles) {
        const uploadRes = await handleImageUpload(file, "products");
        filePath.push(uploadRes.filePath);
      }

      const token = await getToken();

      const data = {
        name,
        description,
        type,
        label,
        warranty: Number(warranty) || 0,
        quantity: Number(quantity) || 0,
        sku,
        usps,
        imageUrls,
        filePath,
        subcategoryId,
      };

      await addProductAPI(data, token!);
      console.log("New product added");
      
      fetchAllProducts();

      // Reset form
      setName("");
      setDescription("");
      setType("");
      setLabel("");
      setWarranty("");
      setQuantity("");
      setSku("");
      setUsps("");
      setSubcategoryId("");
      setImageFiles([]);
      setManualFiles([]);

      setOnAddOpen(false);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={addOnOpen} onOpenChange={setOnAddOpen}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>
            Add a new product with specification details.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Linksys Hydra Pro 6E"
            />
          </div>

          {/* SKU */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="sku">SKU</Label>
            <Input
              id="sku"
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              placeholder="e.g. LKS-HYDRA-PRO6E"
            />
          </div>

          {/* Subcategory */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="subcategory">Subcategory</Label>
            <Select value={subcategoryId} onValueChange={setSubcategoryId}>
              <SelectTrigger id="subcategory" className="w-full">
                <SelectValue placeholder="Select subcategory" />
              </SelectTrigger>
              <SelectContent>
                {subcategories.map((sub) => (
                  <SelectItem key={sub.id} value={sub.id}>
                    {sub.name} {sub.categories ? `(${sub.categories.name})` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Type Select */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="type">Product Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger id="type" className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {productTypes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Label Select */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="label">Label</Label>
            <Select value={label} onValueChange={setLabel}>
              <SelectTrigger id="label" className="w-full">
                <SelectValue placeholder="Select label" />
              </SelectTrigger>
              <SelectContent>
                {productLabels.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g. 50"
            />
          </div>

          {/* Warranty */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="warranty">Warranty (Years)</Label>
            <Input
              id="warranty"
              type="number"
              value={warranty}
              onChange={(e) => setWarranty(e.target.value)}
              placeholder="e.g. 3"
            />
          </div>

          {/* USPs */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <Label htmlFor="usps">USPs (Comma-separated)</Label>
            <Input
              id="usps"
              type="text"
              value={usps}
              onChange={(e) => setUsps(e.target.value)}
              placeholder="Uncluttered 6GHz band, Velop Mesh, Low latency"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <Label htmlFor="description">Description (Markdown)</Label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product details in markdown format..."
              className="flex min-h-[100px] w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:focus-visible:ring-zinc-300"
            />
          </div>

          {/* Product Images */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <Label htmlFor="images">Product Images</Label>
            <Input
              id="images"
              type="file"
              accept="image/*"
              multiple
              className="cursor-pointer"
              onChange={(e) => {
                const files = e.target.files;
                if (files) {
                  setImageFiles(Array.from(files));
                }
              }}
            />
          </div>

          {/* Manual Files */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <Label htmlFor="manuals">Manual / Documents</Label>
            <Input
              id="manuals"
              type="file"
              accept=".pdf,.doc,.docx"
              multiple
              className="cursor-pointer"
              onChange={(e) => {
                const files = e.target.files;
                if (files) {
                  setManualFiles(Array.from(files));
                }
              }}
            />
          </div>
        </div>

        <DialogFooter className="mt-4 gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleAddProduct} disabled={loading}>
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

export default AddProduct;
