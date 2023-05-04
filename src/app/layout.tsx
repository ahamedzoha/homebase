import Navbar from "@/components/global/navbar/Navbar"
import "./globals.css"
import { Nunito } from "next/font/google"
import RegisterModal from "@/components/global/modals/RegisterModal"
import ToasterProvider from "@/providers/ToasterProvider"
import LoginModal from "@/components/global/modals/LoginModal"
import getCurrentUser from "@/actions/getCurrentUser"
import RentModal from "@/components/global/modals/RentModal"

export const metadata = {
  title: "HomeBase",
  description: "HomeBase is a temporary home for your vacation rental.",
  icons: {
    icon: "/favicon.ico",
  },
}

const font = Nunito({ subsets: ["latin"] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  )
}
