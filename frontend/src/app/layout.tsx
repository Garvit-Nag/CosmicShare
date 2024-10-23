import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toast";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CosmicShare - Secure File Sharing',
  description: 'Share files securely with expiring links',
  icons: {
    icon: [
      {
        url: '/tab.png',
        href: '/tab.png',
      },
    ],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster 
          position="top-right"
          expand={false}
          richColors
          closeButton
          theme="dark"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
          }}
          toastOptions={{
            style: {
              background: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
            },
            className: 'cosmic-toast',
          }}
        />
      </body>
    </html>
  );
}