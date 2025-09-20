// ~/composables/business/useBusiness.ts
import { reactive, toRefs } from 'vue';

/**
 * TODO LATER - load and manage business state here
 * e.g. fetch business data from Supabase and store it in this composable's state
 * so it can be shared across components without needing to refetch multiple times.
 * 
 * Currently, business data is being fetched in middleware and stored in a Nuxt state.
 * This is fine for now, but a more robust solution would be to manage it here.
 */

const state = reactive({
  business: {} as Database['public']['Tables']['business']['Row'] | null
});

export function useBusiness() {
  return {
    ...toRefs(state) // -> { business: Ref<Database['public']['Tables']['business']['Row'] | null> }
  };
}
