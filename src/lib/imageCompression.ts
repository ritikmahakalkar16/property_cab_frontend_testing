/**
 * Image compression and AVIF conversion utility
 * Compresses images and converts them to AVIF format for optimal storage and load times
 */

interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

const DEFAULT_OPTIONS: CompressionOptions = {
  maxWidth: 1920,
  maxHeight: 1080,
  quality: 0.8,
};

/**
 * Check if the browser supports AVIF encoding
 */
const supportsAvif = async (): Promise<boolean> => {
  if (typeof document === 'undefined') return false;
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const dataUrl = canvas.toDataURL('image/avif');
  return dataUrl.startsWith('data:image/avif');
};

/**
 * Compress and convert an image file to AVIF format
 * Falls back to WebP if AVIF is not supported
 */
export const compressImage = async (
  file: File,
  options: CompressionOptions = {}
): Promise<File> => {
  const { maxWidth, maxHeight, quality } = { ...DEFAULT_OPTIONS, ...options };

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      const img = new Image();

      img.onload = async () => {
        try {
          // Calculate new dimensions while maintaining aspect ratio
          let { width, height } = img;

          if (width > maxWidth! || height > maxHeight!) {
            const ratio = Math.min(maxWidth! / width, maxHeight! / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          // Create canvas and draw resized image
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }

          // Enable high quality image rendering
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // Check AVIF support and convert
          const avifSupported = await supportsAvif();
          const mimeType = avifSupported ? 'image/avif' : 'image/webp';
          const extension = avifSupported ? '.avif' : '.webp';

          // Convert to blob
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Failed to compress image'));
                return;
              }

              // Create new file with appropriate extension
              const originalName = file.name.replace(/\.[^/.]+$/, '');
              const newFileName = `${originalName}${extension}`;

              const compressedFile = new File([blob], newFileName, {
                type: mimeType,
                lastModified: Date.now(),
              });

              console.log(
                `Compressed: ${file.name} (${formatFileSize(file.size)}) → ${newFileName} (${formatFileSize(compressedFile.size)})`
              );

              resolve(compressedFile);
            },
            mimeType,
            quality
          );
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

/**
 * Compress multiple images in parallel
 */
export const compressImages = async (
  files: File[],
  options: CompressionOptions = {}
): Promise<File[]> => {
  const compressionPromises = files.map((file) => compressImage(file, options));
  return Promise.all(compressionPromises);
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
