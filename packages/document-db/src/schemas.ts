import mongoose, { Schema, Document } from 'mongoose';

// 1. CMS Document Schema (Pages, Blogs, Articles)
export interface ICmsDocument extends Document {
  tenantId: string;
  title: string;
  slug: string;
  type: 'page' | 'post' | 'author';
  content: any; // Dynamic JSON content (Block editor or raw HTML)
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  publishedAt?: Date;
  authorId?: string;
}

const CmsDocumentSchema: Schema = new Schema({
  tenantId: { type: String, required: true, index: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  type: { type: String, enum: ['page', 'post', 'author'], required: true },
  content: { type: Schema.Types.Mixed },
  seo: {
    title: String,
    description: String,
    keywords: [String]
  },
  publishedAt: Date,
  authorId: String,
}, { timestamps: true });

// Ensure uniqueness per tenant
CmsDocumentSchema.index({ tenantId: 1, slug: 1, type: 1 }, { unique: true });

export const CmsDocumentModel = mongoose.models.CmsDocument || mongoose.model<ICmsDocument>('CmsDocument', CmsDocumentSchema);

// 2. Theme Configuration Schema
export interface IThemeConfig extends Document {
  tenantId: string;
  themeId: string; // Ref to Postgres Theme
  settings: Record<string, any>; // Color palettes, typography, layout choices
  active: boolean;
}

const ThemeConfigSchema: Schema = new Schema({
  tenantId: { type: String, required: true, index: true },
  themeId: { type: String, required: true },
  settings: { type: Schema.Types.Mixed, default: {} },
  active: { type: Boolean, default: false }
}, { timestamps: true });

export const ThemeConfigModel = mongoose.models.ThemeConfig || mongoose.model<IThemeConfig>('ThemeConfig', ThemeConfigSchema);

// 3. Builder Block Schema (Dynamic Layout Blocks)
export interface IBuilderBlock extends Document {
  tenantId: string;
  name: string;
  type: string; // 'hero', 'testimonials', 'products_grid'
  data: any; // JSON representation of the block data
}

const BuilderBlockSchema: Schema = new Schema({
  tenantId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  data: { type: Schema.Types.Mixed, default: {} }
}, { timestamps: true });

export const BuilderBlockModel = mongoose.models.BuilderBlock || mongoose.model<IBuilderBlock>('BuilderBlock', BuilderBlockSchema);
