import React from "react";
import I18nProvider from "@/core/providers/I18nProvider";
import { Geist, Geist_Mono } from "next/font/google";
import { CharacterServiceProvider } from "@/core/providers/character-service-provider";
import Header from "@/presentation/components/header";
import "./global.css";
import { EpisodeServiceProvider } from "@/core/providers/episode-service-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          <I18nProvider>
            <CharacterServiceProvider>
              <EpisodeServiceProvider>{children}</EpisodeServiceProvider>
            </CharacterServiceProvider>
          </I18nProvider>
        </body>
      </html>
    </>
  );
}
