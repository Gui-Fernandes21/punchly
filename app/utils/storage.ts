import type { SupabaseClient } from '@supabase/supabase-js';

function businessLogoPath(businessId: number, blob: Blob) {
  const ext = blob.type?.split('/')[1]?.split('+')[0] || 'bin';
  return `uploads/${businessId}/logo.${ext}`; // you can also drop extension and rely on contentType
}

/**
 * TRANSFER THIS LOGIC INTO A SERVER ACTION LATER
 */
export const uploadBusinessLogo = async (fileBlob: Blob, fileName: string, bizId: number, client: SupabaseClient<Database>): Promise<{ publicUrl: string, path: string, error: string | null }> => {
  if (!fileBlob || !bizId) {
    return { publicUrl: '', path: '', error: 'Invalid file or business ID' };
  }
  
  const formData = new FormData();

  const filePath = businessLogoPath(bizId, fileBlob);

  formData.append('business_logo', fileBlob, fileName);
  
  const file = formData.get('business_logo') as Blob;

  // upload new file
  const { error: logoError } = await client.storage.from('business_logo').upload(filePath, file, {
    cacheControl: '60',
    contentType: fileBlob.type || 'application/octet-stream',
    upsert: true
  });

  if (logoError) {
    console.error('Error uploading business logo:', logoError);
    return { publicUrl: '', path: '', error: logoError.message };
  }
  
  const { data: pub } = client.storage.from('business_logo').getPublicUrl(filePath);

  const url = pub?.publicUrl ? `${pub?.publicUrl}?v=${Date.now()}` : '';

  return { publicUrl: url, path: filePath, error: null };
};