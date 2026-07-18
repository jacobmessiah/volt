import type { Metadata } from "next"
import { Geist_Mono, Inter, Space_Grotesk } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
})


export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  ),
  title: "Volt — Charge Your Step",
  description:
    "Volt is your destination for premium footwear — built for speed, comfort, and style. Shop the latest running, basketball, lifestyle, and limited-edition sneakers.",
  openGraph: {
    title: "Volt — Charge Your Step",
    description:
      "Premium footwear for every stride. Running, basketball, lifestyle & more.",
    siteName: "Volt",
    type: "website",
    images: [
      {
        url: "/logo-with-bg.png",
        width: 1200,
        height: 630,
        alt: "Volt — Charge Your Step",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Volt — Charge Your Step",
    description: "Premium footwear for every stride.",
    images: ["/logo-with-bg.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable,
        grotesk.variable, 
      )}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
