import groq from 'groq'
import { pageBuilderQuery } from '../queries/organisms/pageBuilderQuery'
import { ImageQuery } from '../queries/atoms/ImageQuery'
import { ButtonQuery } from '../queries/atoms/ButtonQuery'
import { client } from './sanity.client'
import { stegaClean } from '@sanity/client/stega'
import { CallToActionQuery2 } from '../queries/sections/CallToActionQuery2'

// GROQ Navigation Query
export const NAVIGATION_QUERY = groq`
*[_type == "navigation" && locale == $locale][0] {
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
  category->{
    title,
  },
  ${SEO_QUERY},
  image{
    ${ImageQuery}
  },
  description[]{
    ...,
  },
  descriptionEN[]{
    ...,
  },
  
  "events": *[_type == "event" && _id != ^._id] | order(date desc) [0...8] {
    title, 
  "slug": slug.current,
  startDate,
  image {
    ${ImageQuery},
  },
  category->{
    title,
  },
  _type,
  price
  }
}
`

export const SCHOOLPAGE_QUERY = groq`
*[_type == "school" && slug.current == $slug && locale == $locale][0] {
  ...,
  "localeInfo": {
    locale,
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      title,
      _type,
      slug,
      locale
    },
  },
  _type,
  ${SEO_QUERY},
  mainImage{
    ${ImageQuery}
  },
  schoolInfo {
    ...,
    description[]{
    ...,
  }
  },
  description[]{
    ...,
  },
  "cta": {
    ${CallToActionQuery2}
  }
}
`

// GROQ Page Query
export const PAGE_QUERY = groq`
*[_type == "page" && slug.current == $slug && locale == $locale][0] {
  ...,
  "localeInfo": {
    locale,
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      title,
      _type,
      slug,
      locale
    },
  },
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

// GROQ Settings Query
export const SITE_SETTINGS_QUERY = groq`
*[_type == "settings" && locale == $locale][0] {
  ...,
  bodyScripts,
  siteTitle,
  siteDescription,
  footerScripts,
  headScripts,
  googleTagManager {
    id,
    verification,
  }
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
  },
  fields[]->{
    title,
    titleEnglish
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
      "company": companyRef->name,  // Fetch the company name
      "companyRefId": companyRef->_id   // Fetch the company _id from companyRef
    }
  `

  const result = await client.fetch(query, { username })

  if (!result) {
    return null // Return null if no user is found
  }
  console.log('Fetched user data:', result)

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

// GROQ Footer Query
export const FOOTER_QUERY = groq`
*[_type == "footer" && locale == $locale][0] {
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
} `

export const POPUP_QUERY = groq`
*[_type == "popup" && active == true][0] {
  active,
  type,
  custom {
    description,
    title,
    image {
      ${ImageQuery}
    },
    ${ButtonQuery}
  },
  event->{
    title,
    "slug": slug.current,
    startDate,
    price,
    image {
      ${ImageQuery}
    },
  },
}

`
