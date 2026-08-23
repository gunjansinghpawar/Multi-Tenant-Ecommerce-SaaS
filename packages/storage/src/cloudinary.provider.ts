import { StorageProvider } from '@commercex/types';

// Mock Cloudinary SDK for illustration. In a real scenario, you'd `import { v2 as cloudinary } from 'cloudinary'`
const cloudinary = {
  config: (config: any) => {},
  uploader: {
    upload_stream: (options: any, callback: any) => {
      return {
        end: (buffer: Buffer) => {
          callback(null, { secure_url: `https://res.cloudinary.com/demo/image/upload/${options.folder}/${options.public_id}` });
        }
      }
    },
    destroy: async (publicId: string) => ({ result: 'ok' })
  },
  url: (publicId: string, options: any) => `https://res.cloudinary.com/demo/image/upload/${options.sign_url ? 'signed/' : ''}${publicId}`
};

export class CloudinaryStorageProvider implements StorageProvider {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadFile(buffer: Buffer, filename: string, mimeType: string, path: string = 'general'): Promise<string> {
    return new Promise((resolve, reject) => {
      const publicId = filename.split('.')[0]; // basic public_id extraction
      const stream = cloudinary.uploader.upload_stream(
        { folder: path, public_id: publicId, resource_type: 'auto' },
        (error: any, result: any) => {
          if (error) {
            reject(new Error(`Cloudinary upload failed: ${error.message}`));
          } else {
            resolve(result.secure_url);
          }
        }
      );
      stream.end(buffer);
    });
  }

  async deleteFile(path: string): Promise<boolean> {
    try {
      const result = await cloudinary.uploader.destroy(path);
      return result.result === 'ok';
    } catch (error: any) {
      console.error(`[CloudinaryStorageProvider] Delete failed: ${error.message}`);
      return false;
    }
  }

  async getSignedUrl(path: string, expiresIn: number = 3600): Promise<string> {
    // Cloudinary supports signed URLs for private assets
    return cloudinary.url(path, { sign_url: true, expires_at: Math.floor(Date.now() / 1000) + expiresIn });
  }
}
