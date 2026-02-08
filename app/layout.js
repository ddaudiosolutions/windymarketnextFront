import { Saira_Stencil_One, Saira } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/header/Navigation';
import Providers from '@/reduxLib/provider';
import GoogleAnalytics from '@/components/googleAnalytics/GoogleAnalytics';

const sairaStencil = Saira_Stencil_One({
  weight: ['400'],
  subsets: ['latin'],
});

const sairaFont = Saira({
  weight: ['100', '400'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'WindyMarket',
  description: ' Marketplace de productos',
};

export default function RootLayout({ children }) {
  return (
    <html lang='es'>
      <body className={`${sairaStencil.className} ${sairaFont.className}`}>
        <GoogleAnalytics />
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
