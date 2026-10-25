import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Saathi (साथी / సాథి) - Multilingual AI Government Scheme Assistant',
  description:
    'Discover Indian government schemes you are eligible for using voice and your native language (English, Hindi, Telugu). Get personalized document roadmaps, verification, and checklists.',
  keywords: [
    'government schemes',
    'PM-KISAN',
    'scholarships',
    'Ayushman Bharat',
    'India',
    'voice assistant',
    'Hindi',
    'Telugu',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className="antialiased selection:bg-saathi-saffron/20 selection:text-saathi-saffronDark">
        {children}
      </body>
    </html>
  );
}
