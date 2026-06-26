import { supabase } from "@/lib/supabase";

export const handleImageDelete = async (
  publicUrl: string,
  bucketName: string
): Promise<boolean> => {
  // Ensure a valid public URL is provided
  if (!publicUrl) {
    // Nothing to delete; treat as successful noop
    return true;
  }
  const prefix = `/object/public/${bucketName}/`;
  const idx = publicUrl.indexOf(prefix);
  if (idx === -1) {
    throw new Error("Invalid Supabase public URL");
  }
  const filePath = publicUrl.substring(idx + prefix.length);

  const { error } = await supabase.storage.from(bucketName).remove([filePath]);
  if (error) {
    throw new Error(error.message);
  }
  return true;
};
