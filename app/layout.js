import { Saira_Stencil_One, Saira, Courier_Prime } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.css';
import './globals.css';

import Navigation from '@/components/header/Navigation';
import Providers from '@/reduxLib/provider';
/* import Head from 'next/head'; */
import BootstrapJs from '@/components/bootStrap/BootstrapJs';
import GoogleAnalytics from './GoogleAnalytics';

/* const sairaStencil = Saira_Stencil_One({
  weight: ['400'],
  styles: ['normal', 'bold'],
  subsets: ['latin']
}) */

const sairaFont = Saira({
  weight: ['100', '400'],
  styles: ['normal', 'bold', 'light'],
  subsets: ['latin']
})

/* const sairaFont = Courier_Prime({
  weight: ['400'],
  styles: ['normal', 'bold', 'light'],
  subsets: ['latin']
}) */

export const metadata = {
  title: 'WindyMarket',
  description: 'Compra y vende tu material',
  openGraph: {
    title: 'WindyMarket',
    description: 'Compra y vende tu material',
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
      {/* <Head>
        <meta name="description" content="Compra y vende tu material" />
        <meta property="og:title" content="WindyMarket" />
        <meta property="og:image" content="/LOGO_CIRCULAR_FONDO_BLANCO.png" />
      </Head> */}
      <body className={`${sairaFont.className}`}>
        <Providers>
          <header>
            <Navigation />
          </header>
          {children}
          <BootstrapJs />
          <GoogleAnalytics />
        </Providers>
      </body>
    </html>
  );
}
