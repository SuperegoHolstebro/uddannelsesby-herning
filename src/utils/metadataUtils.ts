// utils/metadataUtils.ts
import { Metadata } from 'next';

export async function generatePageMetadata(page: any, baseUrl: string): Promise<Metadata> {
  if (!page) {
    return {
      title: 'Siden kunne ikke findes',
      description: 'Siden du leder efter kunne ikke findes',
    };
  }

  return {
    title: page.seoGroup?.seoTitle || page.title,
    description: page.seoGroup?.seoDescription || '',
    openGraph: {
      title: page.seoGroup?.seoTitle || page.title,
      description: page.seoGroup?.seoDescription || '',
      url: `${baseUrl}/`,
      images: page.image ? [{ url: page.seoGroup?.image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.seoGroup?.seoTitle || page.title,
      description: page.seoGroup?.seoDescription || '',
      images: page.image ? [{ url: page.seoGroup?.image }] : [],
    },
  };
}


