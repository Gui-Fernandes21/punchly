// composables/useImageCropper.ts
import { ref, type Ref } from 'vue';

interface ConfirmOptions {
  message: string;
  header: string;
  icon: string;
  rejectProps: {
    label: string;
    severity: string;
    outlined: boolean;
  };
  acceptProps: {
    label: string;
    severity: string;
  };
  accept: () => void;
}

interface Confirm {
  require: (options: ConfirmOptions) => void;
}

interface Toast {
  add: (options: { severity: string; summary: string; detail: string; life: number }) => void;
}

interface CropperResult {
  canvas: HTMLCanvasElement;
}

interface UseImageCropperProps {
  confirm: Confirm;
  toast: Toast;
}

export function useImageCropper({ confirm, toast }: UseImageCropperProps) {
  const cropper: Ref<any> = ref(null);

  const fullImage: Ref<string | null> = ref(null);
  const croppedImage: Ref<string | null> = ref(null);

  const editDialogVisible: Ref<boolean> = ref(false);
  const fileName: Ref<string | null> = ref(null);

  const imageBlob: Ref<Blob | null> = ref(null);

  const selectImage = (imageData: object | any) => {
    const file = imageData?.files?.[0];

    if (file) {
      croppedImage.value = null;
      fileName.value = null;

      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        fullImage.value = e.target?.result as string;
        fileName.value = file.name;
      };

      reader.readAsDataURL(file);
    }
    editDialogVisible.value = true;
  };

  const clearImage = () => {
    confirm.require({
      message: 'Are you sure you want to delete this image?',
      header: 'Delete',
      icon: 'pi pi-info-circle',
      rejectProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptProps: {
        label: 'Delete',
        severity: 'danger'
      },
      accept: () => {
        deleteImage();
        toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Image deleted', life: 3000 });
      }
    });
  };

  const allowCrop = computed(() => {
    return fullImage.value ? true : false;
  });

  const deleteImage = () => {
    croppedImage.value = null;
    fullImage.value = null;
  };

  const saveCroppedImage = () => {
    if (cropper.value) {
      const { canvas } = cropper.value.getResult() as CropperResult;

      canvas.toBlob(blob => {
        imageBlob.value = blob;
      });
      
      croppedImage.value = canvas.toDataURL();
      editDialogVisible.value = false;
    }
  };

  return {
    cropper,
    fileName,
    imageBlob,
    fullImage,
    croppedImage,
    editDialogVisible,
    allowCrop,
    selectImage,
    clearImage,
    saveCroppedImage
  };
}
