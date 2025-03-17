import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";  // Importa a tipagem correta
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meu Projeto Next.js",
  description: "Aplicação integrada com backend",
};

// 🔹 Adicionamos a tipagem correta para children
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ✅ Barra de Navegação */}
        <nav className="bg-#F89D13 p-4 text-white flex gap-4" style={{ backgroundColor: "#F89D13" }} >
          <Link href="/" className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition">🏠 Home</Link>
          <Link href="/login" className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition">🔑 Login</Link>
          <Link href="/cadastro" className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition">📝 Cadastro</Link>
        </nav>

        {/* ✅ Conteúdo Principal */}
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}




