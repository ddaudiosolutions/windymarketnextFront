import { Saira_Stencil_One, Saira } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.css'
import Navigation from '@/components/header/Navigation';
import Providers from '@/reduxLib/provider';
import Head from 'next/head';


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
  description: 'Compra y vende tu material',
  icons: {
    icon: '/LOGO_CIRCULAR_FONDO_BLANCO.png', // ruta al favicon en la carpeta public
  },
  openGraph: {
    images: [
      {
        url: '/LOGO_CIRCULAR_FONDO_BLANCO.png',
        alt: 'WindyMarket Logo',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${sairaStencil.className} ${sairaFont.className}`}>
        <Providers>
          <header>
            <Navigation />
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
