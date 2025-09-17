export default defineNuxtRouteMiddleware(async (to) => {
  // Public routes that should NOT be gated
  const PUBLIC_PREFIXES = ['/login', '/auth', '/c/']; // your customer pages
  if (PUBLIC_PREFIXES.some((p) => to.path.startsWith(p)) || to.path === '/onboarding') return;

  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  // If not logged in, let your other auth middleware handle it
  if (!user.value) return;

  // Load business once (cache in a store if you like)
  const { data: business, error } = await supabase.from('business').select('onboarded_at').eq('user_id', user.value.id).single() as any;

  if (error) return;

  if (!business?.onboarded_at && to.path !== '/onboarding') {
    return navigateTo('/onboarding');
  }
});
