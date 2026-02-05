import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tavishi | Product Manager",
  description: "Technical product professional with 4+ years of experience delivering enterprise platforms across cloud and automation ecosystems. Northwestern University MS Engineering Management.",
  keywords: ["Product Manager", "Product Analyst", "Northwestern", "Enterprise Software", "AI", "GenAI"],
  authors: [{ name: "Tavishi" }],
  icons: {
    icon: "/tavishi_avatar.png",
    shortcut: "/tavishi_avatar.png",
    apple: "/tavishi_avatar.png",
  },
  openGraph: {
    title: "Tavishi | Product Manager",
    description: "Technical product professional delivering enterprise platforms across cloud and automation ecosystems.",
    type: "website",
    images: ["/tavishi_avatar.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <ThemeProvider>
          <div className="noise">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
