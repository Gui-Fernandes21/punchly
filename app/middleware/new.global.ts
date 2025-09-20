export default defineNuxtRouteMiddleware(async (to) => {
  // Public routes that should NOT be gated
  const PUBLIC_PREFIXES = ['/login', '/auth']; // your customer pages
  const ONBOARDING_ROUTES = ['/new'];
  if (PUBLIC_PREFIXES.some((p) => to.path.includes(p)) || ONBOARDING_ROUTES.includes(to.path)) return;

  const supabase = useSupabaseClient<Database>();
  const user = useSupabaseUser();

  // If not logged in, let your other auth middleware handle it
  if (!user.value) return;

  // Load business once (cache in a store if you like)
  const { data: business, error } = await supabase.from('business').select('*').eq('owner_id', user.value.id).single() as { data: Tables<'business'> | null; error: Error | null };

  if (error) return;

  useState<Tables<'business'> | null>('business_data', () => business);

  if (!business?.onboarded_at && !to.path.includes('/new/')) {
    return navigateTo('/business/new/create');
  }
});