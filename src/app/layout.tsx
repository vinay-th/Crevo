import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'Crevo',
  description: 'Crevo (Creative Evolution) is a Ai powered design system.',
  icons: {
    icon: './favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="./favicon.ico" type="image/x-icon" />
        </head>
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
    </SessionProvider>
  );
}
