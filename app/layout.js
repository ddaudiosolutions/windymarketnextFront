import { Saira_Stencil_One, Saira } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.css'
import Navigation from '@/components/header/Navigation';
import Providers from '@/reduxLib/provider';


const sairaStencil = Saira_Stencil_One({
  weight: ['400'],
  styles: ['normal', 'bold'],
  subsets: ['latin']
})

const sairaFont = Saira({
  weight: ['100', '400'],
  styles: ['normal', 'bold', 'light'],
  subsets: ['latin']
})

export const metadata = {
  title: 'WindyMarket',
  description: 'Compra venta de material de windsurf foil entre usuarios',
}

export default function RootLayout({ children }) {
  return (
    <html >
      <head>
      </head>
      <Providers>
        <body className={`${sairaStencil.className} ${sairaFont.className}`}>
          <header>
            <Navigation />
          </header>
          {children}
        </body>
      </Providers>
    </html>
  )
}
