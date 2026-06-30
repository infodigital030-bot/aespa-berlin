export const metadata = {
  title: 'ae SPA Berlin – Privates Luxus-Spa in Henningsdorf',
  description: 'Euer exklusives privates Spa-Erlebnis bei Berlin. Whirlpool, Sauna & Outdoor Pool nur für euch – bis zu 4 Personen, ab 250 €.',
  metadataBase: new URL('https://ae-spa.de'),
  alternates: { canonical: 'https://ae-spa.de' },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://ae-spa.de',
    siteName: 'ae SPA',
    title: 'ae SPA – Privates Luxus-Spa bei Berlin',
    description: 'Whirlpool, Sauna & Outdoor Pool exklusiv für euch. Bis zu 4 Personen, ab 250 €.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#f7f5f0', overflowX: 'hidden' }}>
        {children}
      </body>
    </html>
  )
}
