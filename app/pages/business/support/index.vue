<script lang="ts" setup>
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
const toast = useToast();

useHead({
  title: 'Print Store QR Code - Punchly',
  meta: [{ name: 'description', content: 'Print the QR code for your store on Punchly' }]
});

const initialValues = ref({
  message: '',
  email: '',
  subject: ''
});

const resolver = ref(
  zodResolver(
    z.object({
      message: z.string().min(1, { message: 'Message is required.' }),
      email: z.string().email({ message: 'Email is invalid.' }),
      subject: z.string().min(1, { message: 'Subject is required.' })
    })
  )
);
const onFormSubmit = ({ valid }: { valid: boolean }) => {
  if (!valid) {
    toast.add({ severity: 'error', summary: 'Form is invalid.', life: 3000 });
    return;
  } 

  const { error } = useFetch('https://formspree.io/f/xkgvdyzz', {
    method: 'POST',
    body: initialValues.value
  });

  if (error.value) {
    return toast.add({ severity: 'error', summary: 'Error sending message.', life: 3000 });
  }

  toast.add({ severity: 'success', summary: 'Message sent successfully!', life: 3000 });

  initialValues.value = { message: '', email: '', subject: '' };
};
</script>

<template>
  <section>
    <div class="scanner-container">
      <header>
        <h1>Contact Us</h1>
        <p>If you have any questions or need assistance, feel free to reach out!</p>
      </header>

      <Form v-slot="$form" class="contact-form-card flex flex-col gap-4" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit">
        <FloatLabel class="flex flex-col gap-1" variant="in">
          <label for="email" class="text-lg">Email</label>
          <InputText v-model="initialValues.email" name="email" style="resize: none" />
          <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error?.message }}</Message>
        </FloatLabel>

        <FloatLabel class="flex flex-col gap-1" variant="in">
          <label for="subject" class="text-lg">Subject</label>
          <InputText v-model="initialValues.subject" name="subject" style="resize: none" />
          <Message v-if="$form.subject?.invalid" severity="error" size="small" variant="simple">{{ $form.subject.error?.message }}</Message>
        </FloatLabel>

        <FloatLabel class="flex flex-col gap-1" variant="in">
          <label for="message" class="text-lg">Your Message</label>
          <Textarea v-model="initialValues.message" name="message" rows="5" cols="30" style="resize: none" />
          <Message v-if="$form.message?.invalid" severity="error" size="small" variant="simple">{{ $form.message.error?.message }}</Message>
        </FloatLabel>
        <Button type="submit" severity="primary" label="Submit" />
      </Form>
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
header > h1 {
  font-size: 24px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
}
header > p {
  font-size: 14px;
  color: #717171;
  font-family: 'Open Sans', sans-serif;
}
.icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #00000020;

  z-index: -1;
}
.contact-form-card {
  position: relative;
  z-index: 2;

  width: 100%;
  padding: 2rem 1rem;
  margin: 1rem 0;

  background: #fff;
  border-radius: 8px;

  text-align: center;

  font-size: 1.6rem;
  font-weight: 600;
}
.link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  margin: 10px;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  color: var(--text-color);

  font-size: 16px;
  font-weight: 400;
  cursor: pointer;

  transition: background-color 0.2s;

  &:hover {
    background-color: #f9f9f9;
  }
}
</style>
