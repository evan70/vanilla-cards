/**
 * BlogPostDTO
 * Auto-generated from PHP class: Application\DTOs\BlogPostDTO
 * ⚠️  DO NOT EDIT - This file is auto-generated
 */
export interface BlogPostDTO {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  content: string;
  image?: string | null;
  publishedAt: string;
  author: unknown[];
  categories: unknown[];
  tags: string[];
  views: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  authorId: string;
  readingTime?: number | null;
  tableOfContents: unknown[];
  relatedArticles: unknown[];
}

export function isBlogPostDTO(data: unknown): data is BlogPostDTO {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof (data as BlogPostDTO).id === 'string' &&
    typeof (data as BlogPostDTO).slug === 'string' &&
    typeof (data as BlogPostDTO).title === 'string' &&
    ((data as BlogPostDTO).excerpt === undefined || (data as BlogPostDTO).excerpt === null || typeof (data as BlogPostDTO).excerpt === 'string') &&
    typeof (data as BlogPostDTO).content === 'string' &&
    ((data as BlogPostDTO).image === undefined || (data as BlogPostDTO).image === null || typeof (data as BlogPostDTO).image === 'string') &&
    typeof (data as BlogPostDTO).publishedAt === 'string' &&
    Array.isArray((data as BlogPostDTO).author) &&
    Array.isArray((data as BlogPostDTO).categories) &&
    Array.isArray((data as BlogPostDTO).tags) &&
    typeof (data as BlogPostDTO).views === 'number' &&
    typeof (data as BlogPostDTO).createdAt === 'string' &&
    typeof (data as BlogPostDTO).updatedAt === 'string' &&
    typeof (data as BlogPostDTO).status === 'string' &&
    typeof (data as BlogPostDTO).authorId === 'string' &&
    ((data as BlogPostDTO).readingTime === undefined || (data as BlogPostDTO).readingTime === null || typeof (data as BlogPostDTO).readingTime === 'number') &&
    Array.isArray((data as BlogPostDTO).tableOfContents) &&
    Array.isArray((data as BlogPostDTO).relatedArticles)
  );
}
