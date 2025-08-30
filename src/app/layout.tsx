import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cardápio Digital - Tia da Praia da Bica",
  description:
    "Cardápio Digital para bebidas da famosa Tia da Praia da Bica, a Hildene.",
  keywords: [
    "bar",
    "cardápio",
    "cerveja",
    "drinks",
    "caipirinha",
    "rio de janeiro",
  ],
  openGraph: {
    type: "website",
    title: "Cardápio — Bar da Tia da Praia da Bica",
    description:
      "Veja bebidas, preços e categorias do Bar da Tia da Praia da Bica.",
    siteName: "Bar da Tia da Praia da Bica",
    images: [
      {
        url: "/logo.webp",
        width: 630,
        height: 630,
        alt: "Cardápio do Bar da Tia da Praia da Bica",
      },
    ],
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cardápio — Bar da Tia da Praia da Bica",
    description: "Bebidas e preços.",
    images: ["/img/placeholder.webp"],
  },
  authors: [{ name: "Aron Barbosa", url: "https://github.com/aronboliveira" }],
  alternates: { canonical: "/" },
  other: { "x-ua-compatible": "IE=edge" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="container container-max shell my-3">
          <header
            role="banner"
            className="d-flex align-items-left justify-content-center"
          >
            <div id="logoImages" className="d-flex align-items-left gap-2">
              <Image
                width={316}
                height={316}
                loading="eager"
                src="/logo.webp"
                alt="Logo do Bar"
                style={{ borderRadius: 8 }}
                priority={true}
              />
            </div>
          </header>
          {children}
          <hr className="my-4" />
          <address
            className="text-center text-muted"
            title="Autoria do projeto"
            style={{ opacity: 0.85, marginBottom: "0.5rem" }}
          >
            Desenvolvido por Aron Barbosa —{" "}
            <a
              href="https://github.com/aronboliveira"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub de Aron Barbosa"
            >
              <i className="bi bi-github" aria-hidden="true"></i> GitHub
            </a>
          </address>
          <small
            style={{
              fontSize: "0.8rem",
              fontStyle: "italic",
              color: "gray",
              opacity: 0.7,
              marginLeft: "1rem",
            }}
          >
            * Todas as imagens são meramente ilustrativas
          </small>
        </div>
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        ></script>
      </body>
    </html>
  );
}
