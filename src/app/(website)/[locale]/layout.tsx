import '@/styles/global.css'
import Appconfig from 'config'

export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>
  children: React.ReactNode
}) {
  const locale =
    (await params)?.locale || Appconfig.i18n.defaultLocaleId || 'da'

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  )
}
