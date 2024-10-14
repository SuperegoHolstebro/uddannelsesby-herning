import { ImageAsset, PortableTextBlock, Slug } from "sanity"
import { Seo } from "./Seo.types"
import { PageBuilderTypes } from "./PageBuilder.types"

export interface Page {
  _type: 'page'
  _id: string
  _createdAt: string
  title?: string
  parent?: {
    _ref: string
    _type: 'page'
  }
  slug: Slug
  excerpt?: string
  mainImage?: ImageAsset
  body: PortableTextBlock[]
  pageBuilder: PageBuilderTypes
  seoGroup: Seo;
}

