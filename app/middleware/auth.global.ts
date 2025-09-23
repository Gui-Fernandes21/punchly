export default defineNuxtRouteMiddleware(async (to) => {
  // Login routes should NOT be gated
  const PUBLIC_PREFIXES = ['/login', '/auth', '/confirm-email'];
  
  if (PUBLIC_PREFIXES.some((prefix) => to.path.includes(prefix))) {
    return;
  }

  if (to.query.code) return;

  const session = useSupabaseSession();
  
  if (session.value) return;

  if (to.path.includes('/business')) return navigateTo('/business/login');
  else if (to.path.includes('/client')) return navigateTo('/client/login');
  else return navigateTo('/client/login');
});