import { supabase } from "@/lib/supabase";

export const handleImageUpload = async (file: File, bucketName: string) => {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, file);

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from(bucketName).getPublicUrl(fileName);

  return { publicUrl: data.publicUrl, filePath: fileName };
};
