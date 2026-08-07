export interface Author {
  id: string;
  name: string;
  avatarUrl: string;
  role: string;
  bio?: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color?: string; // Hex color or tailwind class for styling pills
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML or Markdown string
  coverImage: string;
  publishedAt: string;
  readTimeMinutes: number;
  author: Author;
  category: Category;
  tags: Tag[];
}

export interface Comment {
  id: string;
  postId: string;
  user: {
    name: string;
    avatarUrl?: string;
  };
  text: string;
  createdAt: string;
  likes: number;
  replies?: Comment[];
}
