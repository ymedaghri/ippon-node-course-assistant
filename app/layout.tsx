import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/my/header"
import { ClerkProvider } from "@clerk/nextjs"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className} h-screen bg-gradient-to-r from-[#fbc2eb] to-[#a6c1ee]`}
        >
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
