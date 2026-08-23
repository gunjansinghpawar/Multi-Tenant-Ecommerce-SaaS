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

// 4. AI-Generated Content Schema
export interface IAIGeneratedContent extends Document {
  tenantId: string;
  provider: string; // e.g., 'openai', 'anthropic'
  prompt: string;
  output: any; // Dynamic JSON or text
  context?: any;
}

const AIGeneratedContentSchema: Schema = new Schema({
  tenantId: { type: String, required: true, index: true },
  provider: { type: String, required: true },
  prompt: { type: String, required: true },
  output: { type: Schema.Types.Mixed, required: true },
  context: { type: Schema.Types.Mixed }
}, { timestamps: true });

export const AIGeneratedContentModel = mongoose.models.AIGeneratedContent || mongoose.model<IAIGeneratedContent>('AIGeneratedContent', AIGeneratedContentSchema);

// 5. Versioned Page Document Schema (Page Revisions)
export interface IPageRevision extends Document {
  tenantId: string;
  pageId: string; // Ref to Postgres Page ID
  version: number;
  content: any; // Full snapshot of page structure
  createdBy: string; // User ID
}

const PageRevisionSchema: Schema = new Schema({
  tenantId: { type: String, required: true, index: true },
  pageId: { type: String, required: true, index: true },
  version: { type: Number, required: true },
  content: { type: Schema.Types.Mixed, required: true },
  createdBy: { type: String, required: true }
}, { timestamps: true });

// Ensure unique versions per page
PageRevisionSchema.index({ tenantId: 1, pageId: 1, version: 1 }, { unique: true });

export const PageRevisionModel = mongoose.models.PageRevision || mongoose.model<IPageRevision>('PageRevision', PageRevisionSchema);

// 6. Complex Non-Relational Configuration Schema
export interface IFlexibleConfig extends Document {
  tenantId: string;
  key: string;
  value: any; // Deeply nested JSON config
}

const FlexibleConfigSchema: Schema = new Schema({
  tenantId: { type: String, required: true, index: true },
  key: { type: String, required: true },
  value: { type: Schema.Types.Mixed, required: true }
}, { timestamps: true });

FlexibleConfigSchema.index({ tenantId: 1, key: 1 }, { unique: true });

export const FlexibleConfigModel = mongoose.models.FlexibleConfig || mongoose.model<IFlexibleConfig>('FlexibleConfig', FlexibleConfigSchema);
