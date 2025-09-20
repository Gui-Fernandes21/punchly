import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * TRANSFER THIS LOGIC INTO A SERVER ACTION LATER
 */
export const uploadBusinessLogo = async (fileBlob: Blob, fileName: string, bizId: number, client: SupabaseClient<Database>): Promise<{ publicUrl: string, path: string, error: string | null }> => {
  const formData = new FormData();

  const prefix = `uploads/${bizId}`;
  const ext = fileBlob.type?.split('/')[1]?.split('+')[0] || 'bin';
  const filePath = `${prefix}/${crypto.randomUUID()}-${fileName}.${ext}`;
  formData.append('business_logo', fileBlob, fileName);
  
  const file = formData.get('business_logo') as Blob;
  
  // Clean up old files in this biz folder
  const { data: existingFiles, error: listError } = await client.storage.from('business_logo').list(prefix, { limit: 100, offset: 0, sortBy: { column: 'name', order: 'asc' } });
  
  if (listError) {
    console.error('Error listing existing files:', listError);
  } else if (existingFiles && existingFiles.length > 0) {
    const pathsToDelete = existingFiles.map(file => `${prefix}/${file.name}`);
    const { error: deleteError } = await client.storage.from('business_logo').remove(pathsToDelete);
    if (deleteError) {
      console.error('Error deleting old files:', deleteError);
    }
  }

  // upload new file
  const { data: logoData, error: logoError } = await client.storage.from('business_logo').upload(filePath, file, {
    cacheControl: '3600',
    upsert: true
  });

  if (logoError) {
    console.error('Error uploading business logo:', logoError);
    return { publicUrl: '', path: '', error: logoError.message };
  }
  
  const { data: pub } = client.storage.from('business_logo').getPublicUrl(filePath);

  return { publicUrl: pub.publicUrl, path: filePath, error: null };
};