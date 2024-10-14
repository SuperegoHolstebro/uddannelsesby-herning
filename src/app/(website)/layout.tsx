import '@/styles/global.css'
import { VisualEditing } from 'next-sanity'
import { draftMode } from 'next/headers'
import AdminBar from '@/components/sanity/AdminBar'
import ScrollToTop from '@/components/atoms/ScrollToTop'
import { client } from '~/sanity/lib/sanity.client'
import Head from 'next/head'
import { SITE_SETTINGS_QUERY } from '~/sanity/lib/sanity.queries'


const settings = await client.fetch(SITE_SETTINGS_QUERY)
const headScripts = settings?.headScripts || '';
const metaTags = headScripts.match(/<meta[^>]*>/g) || []; // Only meta tags
const otherHeadContent = headScripts.replace(/<meta[^>]*>/g, ''); // Other HTML elements

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da">
      <Head>
        <script
          id="CookieConsent"
          src="https://policy.app.cookieinformation.com/uc.js"
          data-culture="DA"
          data-gcm-version="2.0"
          type="text/javascript"
        ></script>
        {settings?.headScripts && <script dangerouslySetInnerHTML={{ __html: settings.headScripts }} />}
      </Head>
      <body
        className={`selection:text-light-light selection:bg-green ${draftMode().isEnabled ? 'debug-screens' : ''}`}
      >
        {children}
        {draftMode().isEnabled && (
          <>
            <VisualEditing />
            <AdminBar />
          </>
        )}
        {settings?.footerScripts && <div style={{ visibility: 'hidden', display: 'none', position: 'absolute', width: '0', height: '0' }} dangerouslySetInnerHTML={{ __html: settings.footerScripts }} />}
      </body>
    </html>
  )
}
