/**
 * ArticleEditor Types
 * Auto-generated types for the Markdown editor component
 * 
 * @module @vanilla-cards/types/article-editor
 */

/**
 * Article data structure for the editor
 */
export interface ArticleData {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  image: string | null;
  status: 'draft' | 'published' | 'archived';
  authorId: string;
  categories?: string[];
  tags?: string[];
  views?: number;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Configuration for the ArticleEditor component
 */
export interface ArticleEditorConfig {
  mode: 'create' | 'edit';
  articleId?: string;
  csrfToken: string;
  submitUrl: string;
  mediaUploadUrl: string;
  mediaLibraryUrl: string;
  articleData: ArticleData;
  categories?: Array<{ id: string; name: string }>;
  onError?: (message: string) => void;
}

/**
 * ArticleEditor component interface
 */
export interface ArticleEditor {
  /**
   * Initialize the editor
   */
  init(): void;
  
  /**
   * Destroy the editor and cleanup
   */
  destroy(): void;
  
  /**
   * Get editor content
   */
  getContent(): string;
  
  /**
   * Set editor content
   */
  setContent(content: string): void;
  
  /**
   * Save content to localStorage
   */
  saveToLocalStorage(): void;
  
  /**
   * Load auto-saved content
   */
  loadAutoSave(): void;
}