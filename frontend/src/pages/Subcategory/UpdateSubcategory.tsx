// import { fetchAllCategoryAPI } from "@/api/category.api";
// import { addSubcategoryAPI, updateSubcategoryAPI } from "@/api/subcategory.api";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { handleImageUpload } from "@/util/uploadImageToSupabase";
// import { getToken } from "@clerk/react";
// import { Loader2 } from "lucide-react";
// import { useEffect, useState } from "react";

// interface Categories {
//   id: string;
//   name: string;
// }

// const UpdateSubcategory = ({
//   onUpdateOpen,
//   setOnUpdateOpen,
//   fetchAllSubcategories,
//   id,
// }: {
//   onUpdateOpen: boolean;
//   setOnUpdateOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   fetchAllSubcategories: () => void;
//   id: string;
// }) => {
//   const [image, setImage] = useState<File | null>(null);
//   const [name, setName] = useState<string>("");
//   const [categoryId, setCategoryId] = useState<string>("");

//   const [categories, setCategories] = useState<Categories[]>([]);

//   const [loading, setLoading] = useState<boolean>(false);

//   const handleUpdateSubcategory = async () => {
//     setLoading(true);
//     try {
//       const { publicUrl: imageUrl, filePath } = await handleImageUpload(
//         image,
//         "subcategories",
//       );
//       const token = await getToken();

//       const data = { name, imageUrl, filePath, categoryId };

//       await updateSubcategoryAPI(id, data, token!)
//         .then(() => {
//           fetchAllSubcategories();
//         })
//         .catch((err) => console.log(err.message));
//       console.log("New subcategory added");

//       setName("");
//       setImage(null);

//       setOnUpdateOpen(false);
//     } catch (error: any) {
//       console.log(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFetchAllCategories = async () => {
//     setLoading(true);
//     try {
//       const token = await getToken();

//       await fetchAllCategoryAPI(token!)
//         .then((res) => {
//           console.log(res.data.category);
//           setCategories(res.data.category);
//         })
//         .catch((err) => console.log(err.message));
//     } catch (error: any) {
//       console.log(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     handleFetchAllCategories();
//   }, []);

//   return (
//     <Dialog open={onAddOpen} onOpenChange={setOnAddOpen}>
//       <DialogContent className="sm:max-w-sm">
//         <DialogHeader>
//           <DialogTitle>Add Subcategory</DialogTitle>
//           <DialogDescription>
//             Create new subcategory for products and subcategories here. Click
//             save when you&apos;re done.
//           </DialogDescription>
//         </DialogHeader>

//         <div className="flex justify-start items-start w-full flex-col lg:gap-y-6">
//           <div className="flex justify-start items-start w-full flex-col lg:gap-y-2">
//             <Label>Subcategory Name</Label>
//             <Input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="MR600 Router"
//             />
//           </div>

//           <div className="flex justify-start items-start w-full lg:gap-y-2 flex-col">
//             <Label>Subcategory Image</Label>
//             <Input
//               type="file"
//               accept="image/*"
//               className="cursor-pointer"
//               onChange={(e) => {
//                 const file = e.target.files?.[0];

//                 if (file) {
//                   setImage(file);
//                 }
//               }}
//             />
//           </div>
//           <div className="flex justify-start items-start w-full lg:gap-y-2 flex-col">
//             <Label>Category</Label>
//             <Select value={categoryId} onValueChange={setCategoryId}>
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select category" />
//               </SelectTrigger>
//               <SelectContent>
//                 {categories.map((category) => (
//                   <SelectItem key={category.id} value={category.id}>
//                     {category.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         <DialogFooter className="lg:mt-6">
//           <DialogClose asChild>
//             <Button variant="outline">Cancel</Button>
//           </DialogClose>
//           <Button onClick={handleAddSubcategory}>
//             {loading ? (
//               <Loader2 className="w-4 h-4 animate-spin" />
//             ) : (
//               "Save changes"
//             )}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default UpdateSubcategory;
