import { defineEventHandler, readBody, createError } from 'h3';
import { serverSupabaseServiceRole, serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event): Promise<any> => {
  if (process.env.NODE_ENV === 'production') {
    return createError({ statusCode: 403, statusMessage: 'Not allowed in production' });
  }
  
  const body = await readBody(event);
  const { email, password } = body;

  const client = await serverSupabaseClient(event);

  const { data, error } = await client.auth.signUp({
    email,
    password
  });

  if (error) {
    return createError({ statusCode: 400, statusMessage: error.message });
  }

  const admin = serverSupabaseServiceRole(event);

  // CREATE A NEW BUSINESS RECORD
  const { data: resCreateNewBusiness, error: resCreateNewBusinessError } = await admin.from('business').insert([{ owner_id: data.user?.id, email: email }] as never);

  if (resCreateNewBusinessError) {
    return createError({ statusCode: 400, statusMessage: resCreateNewBusinessError.message });
  }

  return { data, resCreateNewBusiness };
});
