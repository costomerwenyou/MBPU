/**
 * Client-side image compression and resizing utility using HTML5 Canvas.
 * Reduces image size by 90-95% (typically from 5-15MB down to ~250-400KB)
 * before uploading, preventing HTTP 413 Payload Too Large and ERR_CONNECTION_CLOSED.
 */
export async function compressImage(
  file: File,
  maxWidth: number = 1920,
  maxHeight: number = 1920,
  quality: number = 0.82
): Promise<File> {
  // If not an image (e.g. video or pdf), return as is
  if (!file.type.startsWith("image/")) {
    return file;
  }

  // If already under 400KB, skip resizing
  if (file.size < 400 * 1024 && file.type === "image/jpeg") {
    return file;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect-ratio preserved dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(file); // Fallback to original
          return;
        }

        // High quality rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob || blob.size >= file.size) {
              // If compression didn't produce a smaller size, use original
              resolve(file);
              return;
            }

            const cleanName = file.name.replace(/\.[^/.]+$/, "") + ".jpg";
            const compressedFile = new File([blob], cleanName, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });

            resolve(compressedFile);
          },
          "image/jpeg",
          quality
        );
      };

      img.onerror = () => resolve(file);
      img.src = e.target?.result as string;
    };

    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}
