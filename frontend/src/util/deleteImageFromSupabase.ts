import { supabase } from "@/lib/supabase";

export const handleImageDelete = async (
  bucketName: string,
  filePath: string,
) => {
  if (!filePath) {
    return true;
  }

  const { error } = await supabase.storage.from(bucketName).remove([filePath]);

  if (error) {
    console.error("Error deleting file: ", error.message);
  }

  console.log("File deleted successfully");
};
