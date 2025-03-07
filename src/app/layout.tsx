// src/app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'E-Commerce Store',
  description: 'A simple single-page e-commerce app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
