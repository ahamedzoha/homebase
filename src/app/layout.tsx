import Navbar from "@/components/global/navbar/Navbar"
import "./globals.css"
import { Nunito } from "next/font/google"
import RegisterModal from "@/components/global/modals/RegisterModal"
import ToasterProvider from "@/providers/ToasterProvider"

export const metadata = {
  title: "HomeBase",
  description: "HomeBase is a temporary home for your vacation rental.",
  icons: {
    icon: "/favicon.ico",
  },
}

const font = Nunito({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
