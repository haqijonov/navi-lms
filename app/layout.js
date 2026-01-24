import './globals.css'

export const metadata = {
  title: 'NAVI - Online Learning Platform',
  description: 'Learn programming and Front-End development',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
