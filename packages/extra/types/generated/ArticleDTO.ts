/**
 * ArticleDTO
 * Auto-generated from PHP class: Application\DTOs\ArticleDTO
 * ⚠️  DO NOT EDIT - This file is auto-generated
 */
export interface ArticleDTO {
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
}

export function isArticleDTO(data: unknown): data is ArticleDTO {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof (data as ArticleDTO).id === 'string' &&
    typeof (data as ArticleDTO).slug === 'string' &&
    typeof (data as ArticleDTO).title === 'string' &&
    ((data as ArticleDTO).excerpt === undefined || (data as ArticleDTO).excerpt === null || typeof (data as ArticleDTO).excerpt === 'string') &&
    typeof (data as ArticleDTO).content === 'string' &&
    ((data as ArticleDTO).image === undefined || (data as ArticleDTO).image === null || typeof (data as ArticleDTO).image === 'string') &&
    typeof (data as ArticleDTO).publishedAt === 'string' &&
    Array.isArray((data as ArticleDTO).author) &&
    Array.isArray((data as ArticleDTO).categories) &&
    Array.isArray((data as ArticleDTO).tags) &&
    typeof (data as ArticleDTO).views === 'number' &&
    typeof (data as ArticleDTO).createdAt === 'string' &&
    typeof (data as ArticleDTO).updatedAt === 'string' &&
    typeof (data as ArticleDTO).status === 'string' &&
    typeof (data as ArticleDTO).authorId === 'string'
  );
}
