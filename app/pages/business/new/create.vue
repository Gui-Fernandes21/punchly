<script lang="ts" setup>
import { Cropper, CircleStencil } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import 'vue-advanced-cropper/dist/theme.compact.css';

definePageMeta({
  layout: 'card'
});

useHead({
  title: 'Create Business - Punchly',
  meta: [{ name: 'description', content: 'Create your business account on Punchly' }]
});

const businessData = useState<Tables<'business'> | null>('business_data');

const toast = useToast();
const confirm = useConfirm();
const router = useRouter();

const { cropper, fileName, fullImage, allowCrop, croppedImage, imageBlob, editDialogVisible, selectImage, clearImage, saveCroppedImage } = useImageCropper({ confirm, toast });

// COMPUTED
const imageDisplayUrl = computed(() => croppedImage.value || businessData.value?.logo_url || '/layout/images/unknown-user-nobg.png');

// REFS
const businessName = ref(businessData.value?.name || '');
const pending = ref(false);

// METHODS
const confirmProceedWithoutLogo = (): Promise<boolean> => {
  return new Promise((resolve) => {
    confirm.require({
      message: 'No logo image uploaded. Do you want to proceed without a logo?',
      header: 'No Logo Uploaded',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes, proceed',
      rejectLabel: 'No, go back',
      accept: () => resolve(true),
      reject: () => resolve(false)
    });
  });
};

const handleSubmit = async () => {
  if (!businessData.value?.id) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Business ID is missing. Please restart the process.', life: 3000 });
    return;
  }
  if (!businessName.value || businessName.value.trim() === '') {
    toast.add({ severity: 'warn', summary: 'Warning', detail: 'Please enter your business name.', life: 3000 });
    return false;
  }

  if (!imageBlob.value) {
    const ok = await confirmProceedWithoutLogo();
    if (!ok) {
      toast.add({ severity: 'info', summary: 'Info', detail: 'Please upload a logo to proceed.', life: 3000 });
      return;
    }
  }

  const client = useSupabaseClient<Database>();

  pending.value = true;
  try {
    let publicUrl: string | null = null;
    let imagePath: string | null = null;

    // Upload only if we have a new blob
    if (imageBlob.value) {
      const res = await uploadBusinessLogo(imageBlob.value, fileName.value || 'logo.png', businessData.value.id, client);
      if (res.error) throw res.error;
      publicUrl = res.publicUrl;
      imagePath = res.path;
    }

    // Build partial update (avoid overwriting unchanged fields)
    const patch: Partial<Tables<'business'>> = { name: businessName.value };
    if (publicUrl) patch.logo_url = publicUrl;
    if (imagePath) patch.logo_path = imagePath;

    const { error } = await client.from('business').update(patch).eq('id', businessData.value.id);
    if (error) throw error;

    // update local state once
    businessData.value = {
      ...businessData.value,
      name: businessName.value,
      logo_url: publicUrl || businessData.value?.logo_url || null,
      logo_path: imagePath || businessData.value?.logo_path || null
    } as Tables<'business'>;

    toast.add({ severity: 'success', summary: 'Success', detail: 'Business updated!', life: 2500 });
    router.push({ path: '/business/new/card' });
  } catch (err: any) {
    console.error(err);
    toast.add({ severity: 'error', summary: 'Error', detail: err?.message || 'Something went wrong.', life: 4000 });
  } finally {
    pending.value = false;
  }
};
</script>

<template>
  <section>
    <header>
      <div class="placeholder">
        <div class="logo">
          <img src="/images/logo/punchly-logo.png" alt="Logo" />
        </div>
      </div>
      <h1>Create an account</h1>
      <p>Upload your business logo and enter its name.</p>
    </header>

    <form @submit.prevent="handleSubmit">
      <section class="image flex items-center justify-center w-full">
        <div class="image-container relative">
          <img class="image-display" :src="imageDisplayUrl || '/layout/images/menutz-logo.png'" draggable="false" />
          <div class="clear-wrapper" @click="clearImage" v-if="allowCrop">
            <i class="pi pi-trash clear-btn"></i>
          </div>
        </div>

        <div class="image-actions flex gap-2 w-full flex-col">
          <FileUpload mode="basic" name="avatar" @select="selectImage" customUpload auto accept="image/*" :maxFileSize="10000000" chooseLabel="Upload Image" class="p-button-outlined p-button-plain w-unset"></FileUpload>
          <Button icon="pi pi-pencil" severity="primary" label="Adjust Image" class="w-full" @click="editDialogVisible = true" :disabled="!allowCrop" />
          <Dialog v-model:visible="editDialogVisible" header="Edit Logo" modal style="width: 25rem">
            <div class="h-25 w-25">
              <Cropper ref="cropper" class="cropper-edit" :stencil-component="CircleStencil" :src="fullImage" style="height: 25rem" :canvas="{ width: 256, height: 256 }"></Cropper>
            </div>

            <template #footer>
              <Button label="Cancel" severity="secondary" @click="editDialogVisible = false" autofocus />
              <Button label="Save" severity="primary" @click="saveCroppedImage" autofocus />
            </template>
          </Dialog>
        </div>
      </section>

      <FloatLabel variant="on">
        <InputText size="large" id="business-name" v-model="businessName" type="text" />
        <label for="business-name">Business Name</label>
      </FloatLabel>

      <Button class="btn-submit" type="submit">Create Account</Button>
    </form>

    <AppFooter class="footer" />
  </section>
</template>

<style scoped>
section.image {
  margin: 0 0 2.5rem;
}

.image-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.image-container {
  width: 10rem;
  height: 10rem;
  background-color: rgba(240, 240, 240, 0.288);

  border-radius: 50%;
  border-style: none;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.4);

  margin: 0.5rem 0;
  overflow: hidden;

  z-index: 4;
}

header > h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-family: 'Poppins', sans-serif;
}

.image-display {
  width: 100%;
  height: 100%;
  z-index: 1;
}

.footer {
  margin-top: 0;
}

.placeholder {
  width: 100%;
  height: 5rem;
}
.logo {
  position: absolute;
  top: -5rem;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  & > img {
    width: 11rem;
  }
}
section {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  gap: 1rem;

  & > span {
    text-align: start;
    width: 100%;
  }
}

.btn-submit {
  width: 100%;
  margin-top: 1rem;
  padding: 1rem;
}

.resend {
  color: var(--primary-color);
  font-weight: 600;
  margin-left: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
}

::v-deep(.p-floatlabel),
::v-deep(.p-inputtext) {
  width: 100%;
}

::v-deep(.p-inputtext) {
  padding: 1rem;
  font-size: 1.2rem;
}

footer {
  font-size: 11px;
}
</style>
