import { defineEventHandler, readBody, createError } from 'h3';
import { serverSupabaseServiceRole, serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event): Promise<any> => {
  const body = await readBody(event);
  const { email, type, code } = body;

  if (!code) return createError({ statusCode: 400, statusMessage: 'Code is required' });
  if (!type) return createError({ statusCode: 400, statusMessage: 'Type is required' });
  if (!email) return createError({ statusCode: 400, statusMessage: 'Email is required' });

  const client = await serverSupabaseClient(event);

  const { data, error } = await client.auth.verifyOtp({ token_hash: code, type });  
  if (error) {
    return createError({ statusCode: 400, statusMessage: error.message });
  }

  if (!data) return createError({ statusCode: 400, statusMessage: 'No data returned from Supabase' });

  const userAuthId = data.user?.id;
  if (!userAuthId) return createError({ statusCode: 400, statusMessage: 'User Auth ID is missing' });

  const userExist = await client.from('client').select('*').eq('auth_id', userAuthId).single();

  if (userExist.data) {
    return { data, message: 'User already exists' };
  }

  const admin = serverSupabaseServiceRole(event);

  // CREATE A NEW CLIENT RECORD
  const { data: resCreateNewClient, error: resCreateNewClientError } = await admin.from('client').insert([{ auth_id: userAuthId, email: email }] as never);

  if (resCreateNewClientError) {
    return createError({ statusCode: 400, statusMessage: resCreateNewClientError.message });
  }

  return { data, resCreateNewClient };
});