import type { Metadata } from 'next';
import './globals.css';
import { GameProvider } from '@/contexts/GameContext';

export const metadata: Metadata = {
  title: 'Dead Account - zuidhaven.social',
  description: 'An investigation game on a Mastodon instance. Find out what happened to Noor.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}
