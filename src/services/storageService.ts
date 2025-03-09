
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

// Upload an image to storage
export const uploadPropertyImage = async (file: File, propertyId: string) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${propertyId}/${Date.now()}.${fileExt}`;
    const filePath = `properties/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('property-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('property-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error: any) {
    console.error('Error uploading image:', error);
    toast({
      title: 'Upload Failed',
      description: error.message || 'Failed to upload image',
      variant: 'destructive',
    });
    return null;
  }
};
