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
    "bar tropical",
    "bar de rua",
    "boteco",
    "cardápio digital",
    "menu digital",
    "carta de bebidas",
    "coquetéis",
    "mixologia",
    "happy hour",
    "chope",
    "chopp",
    "long neck",
    "lata 473 ml",
    "energético",
    "caipivodka",
    "caipiroska",
    "batida",
    "promoções de bebidas",
    "bar barato",
    "ilha do governador",
    "rj",
    "bar tropical",
    "bar de calle",
    "menú digital",
    "carta de bebidas",
    "cócteles",
    "mixología",
    "happy hour",
    "cerveza",
    "caipiriña",
    "caipiroska",
    "ginebra",
    "vodka",
    "cachaça",
    "lata 473 ml",
    "long neck",
    "bebidas energéticas",
    "combos de bebidas",
    "ofertas de bebidas",
    "río de janeiro",
    "bar tropicale",
    "bar di strada",
    "menu digitale",
    "carta delle bevande",
    "cocktail",
    "mixology",
    "happy hour",
    "birra",
    "caipirinha",
    "caipiroska",
    "gin",
    "vodka",
    "cachaca",
    "lattina 473 ml",
    "bottiglia long neck",
    "bevande energetiche",
    "combo bevande",
    "offerte drink",
    "rio de janeiro",
    "tropical bar",
    "street bar",
    "digital menu",
    "drinks menu",
    "beverage list",
    "cocktails",
    "mixology",
    "happy hour",
    "beer",
    "draft beer",
    "long neck bottle",
    "473 ml can",
    "energy drink",
    "caipirinha",
    "caipiroska",
    "drink combos",
    "drink specials",
    "cheap drinks",
    "rio de janeiro",
    "热带酒吧",
    "街头酒吧",
    "数字菜单",
    "饮品单",
    "鸡尾酒",
    "调酒",
    "欢乐时光",
    "啤酒",
    "金酒",
    "伏特加",
    "卡莎萨酒",
    "卡皮林纳",
    "长颈瓶",
    "473毫升易拉罐",
    "能量饮料",
    "饮品组合",
    "优惠饮品",
    "里约热内卢",
  ],
  openGraph: {
    type: "website",
    title: "Cardápio — Bar da Tia da Praia da Bica",
    description:
      "Veja bebidas, preços e categorias do Bar da Tia da Praia da Bica! Há mais de 10 anos na área!",
    siteName: "Bar da Tia da Praia da Bica",
    url: "https://drinks-tia-pdb.netlify.app/",
    images: [
      {
        url: "/logo-og.webp",
        width: 1200,
        height: 630,
        alt: "Cardápio Digital do Bar da Tia da Praia da Bica",
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
  alternates: { canonical: "https://drinks-tia-pdb.netlify.app/" },
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
            Desenvolvido por{" "}
            <a
              href="https://aronboliveira-dev.netlify.app/"
              target="_blank"
              rel="noopener"
              title="Portfólio web de Aron Barbosa"
              className="text-center text-muted"
              style={{ opacity: 0.85, textDecoration: "none" }}
            >
              Aron Barbosa
            </a>{" "}
            —{" "}
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
          <div>
            <small
              style={{
                fontSize: "0.6rem",
                fontStyle: "italic",
                color: "gray",
                opacity: 0.7,
                marginLeft: "1rem",
              }}
            >
              * Sugestões ou problemas? Envie para o Desenvolvedor&nbsp;
              <a
                href="mailto:aronprogramador@gmail.com"
                target="_blank"
                rel="noopener"
                title="Email profissional de Aron Barbosa"
                className="text-center text-muted"
                style={{ opacity: 0.85, textDecoration: "underline" }}
              >
                clicando aqui!
              </a>
            </small>
          </div>
        </div>
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        ></script>
      </body>
    </html>
  );
}
