import type { Metadata } from "next";
import { Source_Sans_3, Bebas_Neue } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Venda seu Veículo | Stage Motors",
  description:
    "A Stage Motors compra seu veículo com avaliação justa, processo rápido e pagamento seguro. Preencha o formulário e receba uma proposta em até 2 horas.",
  openGraph: {
    title: "Venda seu Veículo | Stage Motors",
    description:
      "Transforme seu carro em dinheiro. Avaliação justa e rápida do seu veículo sem enrolação.",
    type: "website",
    url: "https://stage.salesland.com.br",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${sourceSans.variable} ${bebasNeue.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
