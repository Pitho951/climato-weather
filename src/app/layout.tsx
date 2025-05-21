import { AppProvider } from "@/app/context/app_context";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Climato",
  description: "é um aplicativo de previsão do tempo com design moderno, limpo e responsivo. Desenvolvido com foco na simplicidade e na elegância, ele exibe informações meteorológicas em tempo real de forma clara e intuitiva. Acompanhe a temperatura atual, as condições do clima e a previsão para os próximos 7 dias em uma interface minimalista, pensada especialmente para telas de computador. Seja para planejar o dia ou apenas conferir o tempo, o Climato oferece uma experiência leve, agradável e eficiente. Ideal para demonstrar habilidades em desenvolvimento frontend, design de interfaces, responsividade e integração com APIs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <head>
        <meta name="viewport" content="width=device-width,  initial-scale=1.0" />
        <meta property="og:title" content="Climato" />
        <meta property="og:type" content="image/png" />
        <meta property="og:url" content={"https://climato-weather.vercel.app/assets/images/logo.png"} />
        <meta property="og:image" content="https://climato-weather.vercel.app/assets/images/logo.png" />
        <link rel="icon" type="image/png" href="/assets/images/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppProvider>
          <main className="main">{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
