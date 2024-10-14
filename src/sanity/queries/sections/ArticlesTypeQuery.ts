import groq from 'groq'





const ArticleCardQuery = groq`
title,
"slug": slug.current,
date,
"image": image.asset->url,
_type
`



export const ArticlesTypeQuery = groq`
  _type == "ArticlesType" => {
    ...,
    "articles": select(
      view == "newest" => *[_type == "article"] | order(date desc)[0...24]{
        ${ArticleCardQuery}
      },
      view == "manual" => articles[]->{
        ${ArticleCardQuery}
      },
      view == "all" => *[_type == "article"] | order(date desc){
        ${ArticleCardQuery}
      }
    )
  }
`
