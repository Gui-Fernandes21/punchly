export default defineNuxtRouteMiddleware(async (to) => {
  // Routes that should NOT be gated
  const PUBLIC_PREFIXES = ['/auth', '/confirm-email'];

  if (PUBLIC_PREFIXES.some((prefix) => to.path.includes(prefix))) {
    return;
  }

  if (to.query.code) return;

  const supabase = useSupabaseClient<Database>();
  const session = await supabase.auth.getSession();

  if (session.data.session) {
    if (to.path.includes('/login')) return navigateTo(to.path.replace('/login', '/dashboard'));
    return;
  }

  if (to.path.includes('/login')) return;

  if (to.path.includes('/business')) return navigateTo('/business/login');
  else if (to.path.includes('/client')) return navigateTo('/client/login');
  else return navigateTo('/client/login');
});
