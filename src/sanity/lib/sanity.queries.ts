import groq from 'groq'
import { pageBuilderQuery } from '../queries/organisms/pageBuilderQuery'
import { ImageQuery } from '../queries/atoms/ImageQuery'
import { ButtonQuery } from '../queries/atoms/ButtonQuery'
import { client } from './sanity.client'
import { stegaClean } from '@sanity/client/stega'

// GROQ Navigation Query
export const NAVIGATION_QUERY = groq`
*[_type == "navigation"][0] {
  links[] {
    link {
      ...,
      internalLink-> {
        _type,
        slug,
        title
      }
    },
    subLinks[] {
        ...,
        internalLink-> {
          _type,
          slug,
          title
        }
    }
  }
}

`
// GROQ Seo Query
export const SEO_QUERY = groq` // Inuse
seoGroup {
  "image": seoImage.asset->.url,
  ...
}
`

// GROQ event Query
export const EVENT_QUERY = groq`
*[_type == "event" && slug.current == $slug][0] {
  ...,
  _type,
  ${SEO_QUERY},
  ${pageBuilderQuery},
  image{
    ${ImageQuery}
  }
}
`

// GROQ Page Query
export const PAGE_QUERY = groq`
*[_type == "page" && slug.current == $slug][0] {
  ...,
  _type,
  ${SEO_QUERY},
  ${pageBuilderQuery},
  image {
    ...,
    asset-> {
      ...,
      _id,
      url,
      _type,
      altText,
      description,
      title,
      metadata {
        blurHash,
        dimensions
      }
    }
  }
}
`
// GROQ Article Query
export const ARTICLE_QUERY = groq`
*[_type == "article" && slug.current == $slug][0] {
  ...,
  _type,
  ${SEO_QUERY},
  ${pageBuilderQuery},
  image {
    ...,
    asset-> {
      ...,
      _id,
      url,
      _type,
      altText,
      description,
      title,
      metadata {
        blurHash,
        dimensions
      }
    }
  }
}
`
// GROQ Footer Query
export const FOOTER_QUERY = groq`
  *[_type == "footer"][0] {
  title,
  logo {
    asset-> {
      _id,
      url,
      _type,
      altText,
      description,
      title,
      metadata {
        blurHash,
        dimensions
      }
    }
  },
  object {
    companyName,
    address,
    telephone,
    email,
    cvr
  },
  social[] {
    platform,
    url
  },
  openingHours[] {
    day,
    hours
  }
}
`

// GROQ Settings Query
export const SITE_SETTINGS_QUERY = groq`
*[_type == "settings"][1] {
  siteTitle,
  siteDescription,
  headMeta,
  headScripts,
  footerScripts,
  ...,
}
`

// GROQ All Slugs
export const allSlugsQuery = `
*[defined(slug.current)][]{
  "slug":slug.current,
  _type,
  _updatedAt
}
`

export const COMPANY_QUERY = groq`
*[_type == "company" && slug.current == $slug][0] {
  ...,
  image{
    ${ImageQuery}
  }
}
`

// GROQ Company Login Query// /lib/groqQuery.js
export const getCompanyLogin = async (username) => {
  const query = groq`
    *[_type == "companyLogin" && username == $username][0] {
      _id,
      username,
      password,
      "company": companyRef->name
    }
  `

  const result = await client.fetch(query, { username })

  if (!result) {
    return null // Return null if no user is found
  }

  return stegaClean(result)
}

export async function getAllCompanies() {
  const query = `*[_type == "company"]{
    _id,
    name,
    slug
  }`
  const companies = await client.fetch(query)
  return companies
}
