<script lang="ts" setup>
import { Cropper, CircleStencil } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import 'vue-advanced-cropper/dist/theme.compact.css';

definePageMeta({
  layout: 'auth'
});

useHead({
  title: 'Verify Phone - Punchly',
  meta: [{ name: 'description', content: 'Verify your phone number to continue using Punchly' }]
});

const toast = useToast();
const confirm = useConfirm();

const { cropper, fileName, fullImage, allowCrop, croppedImage, editDialogVisible, selectImage, clearImage, saveCroppedImage } = useImageCropper({ confirm, toast });

// COMPUTED
const imageDisplayUrl = computed(() => croppedImage.value || '/layout/images/menutz-logo.png');

// IMAGE ACTIONS
const onImageClear = () => {
  clearImage();
};
const onSaveCroppedImage = () => {
  saveCroppedImage();
};
const onImageSelect = (imageData: object) => {
  selectImage(imageData);
  editDialogVisible.value = true;
};

const name = ref('');
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

    <form>
      <section class="image flex items-center justify-center w-full">
        <div class="image-container relative">
          <img class="image-display" :src="imageDisplayUrl || '/layout/images/menutz-logo.png'" draggable="false" />
          <div class="clear-wrapper" @click="onImageClear" v-if="allowCrop">
            <i class="pi pi-trash clear-btn"></i>
          </div>
        </div>

        <div class="image-actions flex gap-2 w-full flex-col">
          <FileUpload mode="basic" name="avatar" @select="onImageSelect" customUpload auto accept="image/*" :maxFileSize="10000000" chooseLabel="Upload Image" class="p-button-outlined p-button-plain w-unset"></FileUpload>
          <Button icon="pi pi-pencil" severity="primary" label="Adjust Image" class="w-full my-2" @click="editDialogVisible = true" :disabled="!allowCrop" />
          <Dialog v-model:visible="editDialogVisible" header="Edit Logo" modal style="width: 30rem">
            <div class="h-25 w-25">
              <Cropper ref="cropper" class="cropper-edit" :stencil-component="CircleStencil" :src="fullImage" style="height: 25rem" :canvas="{ width: 256, height: 256 }"></Cropper>
            </div>

            <template #footer>
              <Button label="Cancel" text severity="secondary" @click="editDialogVisible = false" autofocus />
              <Button label="Save" outlined severity="primary" @click="onSaveCroppedImage" autofocus />
            </template>
          </Dialog>
        </div>
      </section>

      <FloatLabel>
        <InputText size="large" id="business-name" v-model="name" type="text" />
        <label for="business-name">Business Name</label>
      </FloatLabel>

      <Button class="btn-submit" type="submit">Create Account</Button>
    </form>

    <footer>
      <p>&copy; 2025 Punchly. All rights reserved.</p>
    </footer>
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
  
  margin: .5rem 0;
  overflow: hidden;

  z-index: 4;
}
.image-display {
  width: 100%;
  height: 100%;
  z-index: 1;
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
