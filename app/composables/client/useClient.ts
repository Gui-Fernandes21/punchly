// ~/composables/client/useClient.ts
import { reactive, toRefs } from 'vue';

/**
 * TODO LATER - load and manage client state here
 * e.g. fetch client data from Supabase and store it in this composable's state
 * so it can be shared across components without needing to refetch multiple times.
 *
 * Currently, client data is being fetched in middleware and stored in a Nuxt state.
 * This is fine for now, but a more robust solution would be to manage it here.
 */

const state = reactive({
  client: {} as Database['public']['Tables']['client']['Row'] | null
});

export function useClient() {
  return {
    ...toRefs(state) // -> { client: Ref<Database['public']['Tables']['client']['Row'] | null> }
  };
}
