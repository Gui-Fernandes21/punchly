import { useErrorModal } from '../composables/ui/useErrorModal';

export default defineNuxtRouteMiddleware(async (to) => {
  const { showError } = useErrorModal();
  const bizId = to.params.business_id as string;
  if (!bizId) return showError({ header: 'Business ID Missing', message: 'Business ID is required' });

  const supabase = useSupabaseClient<Database>();

  const user = useSupabaseUser();

  if (!user.value) return showError({ header: 'Not Logged In', message: 'You must be logged in to access this page' });

  const client = await supabase.from('client').select('*').eq('auth_id', user.value.id).single();

  if (client.error || !client.data) return showError({ header: 'Client Not Found', message: 'No client record found for the logged-in user' });

  const wallet = await supabase
    .from('wallet')
    .select('*')
    .eq('business_id', +bizId)
    .eq('client_id', client.data?.id || -1)
    .single();

  if (wallet.error || !wallet.data) {
    const { error } = await supabase.from('wallet').insert([{ business_id: +bizId, client_id: client.data?.id || -1 }] as never);
    if (error) return showError({ header: 'Wallet Error', message: 'Could not create or load wallet' });
    const newWallet = await supabase
      .from('wallet')
      .select('*')
      .eq('business_id', +bizId)
      .eq('client_id', client.data?.id || -1)
      .single();
    if (newWallet.error || !newWallet.data) return showError({ header: 'Wallet Error', message: 'Could not create or load wallet' });
    useState<Tables<'wallet'> | null>('wallet_data', () => newWallet.data ?? null);
    console.log('Created new wallet', newWallet.data);
    return;
  }

  useState<Tables<'wallet'> | null>('wallet_data', () => wallet.data ?? null);
});
