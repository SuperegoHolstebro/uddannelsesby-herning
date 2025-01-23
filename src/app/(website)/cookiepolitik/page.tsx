import React from 'react'
import Script from 'next/script'

const CookiePage = () => {
  return (
    <>
      <Script
        id="CookiePolicy"
        src="https://policy.app.cookieinformation.com/cid.js"
        data-culture="DA"
        type="text/javascript"
        strategy="afterInteractive"
      />
    </>

  )
}

export default CookiePage
