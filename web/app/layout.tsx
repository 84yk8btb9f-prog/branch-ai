import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const sans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

// NOTE: metadataBase intentionally omitted — branch-landing.vercel.app is squatted
// by a third party and .vercel/project.json carries no production URL. Set it to
// the real domain once one is attached to the Vercel project.
export const metadata: Metadata = {
  title: 'Branch AI — see how your AI actually reasoned',
  description:
    'Reasoning trees for any AI CLI. Capture, navigate, and fork extended thinking from Claude Code, Codex, Gemini, and Droid.',
  openGraph: {
    title: 'Branch AI — see how your AI actually reasoned',
    description:
      'Reasoning trees for any AI CLI. Capture, navigate, and fork extended thinking from Claude Code, Codex, Gemini, and Droid.',
    type: 'website',
    siteName: 'Branch AI',
  },
  twitter: {
    card: 'summary',
    title: 'Branch AI — see how your AI actually reasoned',
    description:
      'Reasoning trees for any AI CLI. Capture, navigate, and fork extended thinking from Claude Code, Codex, Gemini, and Droid.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="bg-[#0a0a0a] text-[#ededed] font-[family-name:var(--font-geist-sans)] antialiased">
        {children}
      </body>
    </html>
  );
}
