import { createClient } from '@supabase/supabase-js';
import { StorageProvider } from '@commercex/types';

export class SupabaseStorageProvider implements StorageProvider {
  private supabase;

  constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.warn('[Storage] Missing Supabase credentials. Storage provider will fail.');
    }

    this.supabase = createClient(supabaseUrl || 'http://localhost:54321', supabaseKey || 'placeholder');
  }

  async uploadFile(buffer: Buffer, filename: string, mimeType: string, path: string = 'general'): Promise<string> {
    const bucket = 'commercex-assets';
    const filePath = `${path}/${filename}`;

    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: mimeType,
        upsert: true,
      });

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    // Get public URL
    const { data: publicData } = this.supabase.storage.from(bucket).getPublicUrl(filePath);
    return publicData.publicUrl;
  }

  async deleteFile(path: string): Promise<boolean> {
    const bucket = 'commercex-assets';
    const { error } = await this.supabase.storage.from(bucket).remove([path]);
    
    if (error) {
      console.error(`[Storage] Failed to delete file: ${error.message}`);
      return false;
    }
    
    return true;
  }

  async getSignedUrl(path: string, expiresIn: number = 3600): Promise<string> {
    const bucket = 'commercex-assets';
    const { data, error } = await this.supabase.storage.from(bucket).createSignedUrl(path, expiresIn);
    
    if (error || !data) {
      throw new Error(`Failed to generate signed URL: ${error?.message}`);
    }
    
    return data.signedUrl;
  }
}

export * from './cloudinary.provider';
export * from './cloudflare-r2.provider';
