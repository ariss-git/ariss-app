import { supabase } from "@/lib/supabase";

export const handleImageDelete = async (
  bucketName: string,
  filePath: string,
) => {
  if (!filePath) {
    console.warn("No file path provided, skipping image delete");
    return true;
  }

  const { data, error } = await supabase.storage
    .from(bucketName)
    .remove([filePath]);

  if (error) {
    console.error("Supabase delete error:", error);
    throw new Error(`Failed to delete image: ${error.message}`);
  }

  console.log("Deleted from Supabase:", data);
  return true;
};
