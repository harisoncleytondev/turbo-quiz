import { GameProvider } from '@/context/game/GameProvider';
import './globals.css';

export const metadata = {
  title: "Turbo Quiz",
  description: "Crie Seu Quiz com IA.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ptbr">
      <body className="bg-purple-800">
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}
