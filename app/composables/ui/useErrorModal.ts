// ~/composables/ui/useErrorModal.ts
import { reactive, toRefs } from 'vue';

type Msg = { header: string; message: string };

const state = reactive({
  errorModalVisible: false,
  message: { header: 'Error', message: 'Something went wrong' } as Msg
});

function showError(msg?: Partial<Msg>) {
  if (msg?.header) state.message.header = msg.header;
  if (msg?.message) state.message.message = msg.message;
  state.errorModalVisible = true;
}
function hide() {
  state.errorModalVisible = false;
}

export function useErrorModal() {
  // return refs so consumers can safely destructure
  return {
    ...toRefs(state), // -> { errorModalVisible: Ref<boolean>, message: Ref<Msg> }
    showError,
    hide
  };
}
