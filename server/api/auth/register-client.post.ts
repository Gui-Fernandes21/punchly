import { defineEventHandler, readBody, createError, H3Error } from 'h3';
import { serverSupabaseServiceRole, serverSupabaseClient } from '#supabase/server';

type ResponseType = {
  data: {
    session: any;
    redirectTo: string;
    user?: any;
    message?: string;
  } | null;
  error?: H3Error;
};

export default defineEventHandler(async (event): Promise<ResponseType> => {
  const body = await readBody(event);
  const { email, type, code, redirectTo } = body;

  if (!code) throw createError({ statusCode: 400, statusMessage: 'Code is required' });
  if (!type) throw createError({ statusCode: 400, statusMessage: 'Type is required' });
  if (!email) throw createError({ statusCode: 400, statusMessage: 'Email is required' });

  const businessId = redirectTo ? redirectTo.split('bizId=')[1] || null : null;
  const redirectUrl = `/client/${businessId ? businessId + '/' : ''}wallet`;

  const client = await serverSupabaseClient(event);

  const { data, error } = await client.auth.verifyOtp({ token_hash: code, type });  
   
  if (error) {
    throw createError({ statusCode: 400, statusMessage: error.message });
  }

  if (!data) throw createError({ statusCode: 400, statusMessage: 'No data returned from Supabase' });

  const userAuthId = data.user?.id;

  if (!userAuthId) throw createError({ statusCode: 400, statusMessage: 'User Auth ID is missing' });

  const userExist = await client.from('client').select('*').eq('auth_id', userAuthId).limit(1);
  
  if (userExist.error && userExist.error.code !== 'PGRST116') {
    throw createError({ statusCode: 400, statusMessage: userExist.error.message });
  }

  if (userExist.data) {
    return { data: { user: userAuthId, session: data.session, message: 'User already exists', redirectTo: redirectUrl } };
  }

  const admin = serverSupabaseServiceRole(event);

  // CREATE A NEW CLIENT RECORD
  const { error: resCreateNewClientError } = await admin.from('client').insert([{ auth_id: userAuthId, email: email }] as never);

  if (resCreateNewClientError) {
    throw createError({ statusCode: 400, statusMessage: resCreateNewClientError.message });
  }

  return { data: { user: userAuthId, session: data.session, message: 'User created successfully', redirectTo: redirectUrl } };
});