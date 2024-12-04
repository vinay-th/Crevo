import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Crevo',
  description: 'Crevo (Creative Evolution) is a Ai powered design system.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
      </head>
      <body>{children}</body>
    </html>
  );
}
