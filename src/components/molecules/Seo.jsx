import Head from 'next/head'
import React, { useEffect } from 'react' // Import the useState hook from the react package

/**
 *
 * @returns: En SEO komponent, der håndterer metadata for en side.
 * @example: <Seo />
 * @alias: Seo
 * @module: components/Seo
 * @summary: Denne komponent bruges til at håndtere metadata for en side.
 * @see: src/components/Seo.tsx
 * @version: 1.0.0
 * @property: [title, description, image, url, favicon, canonical, noIndex, script]
 
 * @author: Kasper Buchholtz & Emilie Hjøllund
 *
**/

const Seo = ({ title, description, image, url }) => {
  useEffect(() => {
    // Cookie Consent Script (Version 2.0)
    const scriptCookieConsent = document.createElement('script')
    scriptCookieConsent.src = 'https://policy.app.cookieinformation.com/uc.js'
    scriptCookieConsent.id = 'CookieConsent'
    scriptCookieConsent.type = 'text/javascript'
    scriptCookieConsent.setAttribute('data-culture', 'DA')
    scriptCookieConsent.setAttribute('data-gcm-version', '2.0')
    document.body.appendChild(scriptCookieConsent)

    // Google Tag Manager Script
    ;(function (w, d, s, l, i) {
      w[l] = w[l] || []
      w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != 'dataLayer' ? '&l=' + l : ''
      j.async = true
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
      f.parentNode.insertBefore(j, f)
    })(window, document, 'script', 'dataLayer', 'GTM-5KGNKC3B')

    // GTAG Script
    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      wait_for_update: 500,
    })
    gtag('set', 'ads_data_redaction', true)
    gtag('set', 'url_passthrough', true)
  }, [])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta property="og:description" content={description} />
        {/* X/Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Head>
    </>
  )
}

export default Seo
