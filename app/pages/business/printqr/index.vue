<script lang="ts" setup>
useHead({
  title: 'Print Store QR Code - Punchly',
  meta: [{ name: 'description', content: 'Print the QR code for your store on Punchly' }]
});

const business = useState<Tables<'business'> | null>('business_data');

const qrSource = useQrcode('https://gui-fernandes-web.web.app/' + business.value?.id + '/login', {
  toBase64: true
});

// Convert Base64 SVG to high-resolution PNG and download
const downloadImage = async () => {
  if (!qrSource.value.startsWith('data:image/svg+xml')) throw new Error('QR source is not a valid SVG image');
  
  try {
    const base64Data = qrSource.value.split(',')[1];
    
    if (!base64Data) throw new Error('Invalid Base64 data');

    // Decode Base64 SVG
    const svgBlob = new Blob([atob(base64Data)], { type: 'image/svg+xml' });
    const svgURL = URL.createObjectURL(svgBlob);

    // Create an Image element
    const img = new Image();
    img.src = svgURL;

    img.onload = () => {
      const scaleFactor = 3; // higher resolution

      // Create a Canvas element
      const canvas = document.createElement('canvas');
      canvas.width = img.width * scaleFactor;
      canvas.height = img.height * scaleFactor;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Failed to get canvas context');

      ctx.drawImage(img, 0, 0);

      // Export the Canvas content as PNG
      canvas.toBlob((blob) => {
        if (!blob) throw new Error('Failed to create PNG blob');

        const fileURL = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = fileURL;
        a.download = 'store-qr-code.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(fileURL);
      }, 'image/png');

      // Revoke the SVG URL
      URL.revokeObjectURL(svgURL);
    };

    img.onerror = () => {
      throw new Error('Failed to load SVG image');
    };
  } catch (error) {
    console.error('Failed to download QR code image:', error);
    alert('An error occurred while downloading the QR code. Please try again.');
  }
};

// Print the QR code
const printImage = () => {
  if (qrSource.value.startsWith('data:image')) {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Failed to open print window. Please check your browser settings.');
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Print QR Code</title>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
            }
            img {
              max-width: 100%;
              height: auto;
            }
          </style>
        </head>
        <body>
          <img src="${qrSource.value}" alt="Store QR Code" />
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  } else {
    alert('QR source is not a valid image.');
  }
};
</script>

<template>
  <section>
    <div class="scanner-container">
      <header>
        <h1>Store QR</h1>
        <p>Print or download the QR code for your store to display at your location.</p>
      </header>
      <div class="qr-card">
        <img :src="qrSource" alt="Store QR Code" class="mx-auto mb-4" />

        <Divider />

        <div class="link" @click="downloadImage">
          <Icon name="material-symbols:download-rounded" size="1.7rem" />
          Download PNG
        </div>
        <div class="link" @click="printImage">
          <Icon name="material-symbols:print" size="1.7rem" />
          Print
        </div>
      </div>
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
.qr-card {
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
