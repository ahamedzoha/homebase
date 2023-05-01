"use client"

import { FC } from "react"
import ToasterProvider from "./ToasterProvider"
import LoginModal from "@/components/global/modals/LoginModal"
import RegisterModal from "@/components/global/modals/RegisterModal"

interface RootProviderProps {
  children: React.ReactNode
}

const RootProvider: FC<RootProviderProps> = ({ children }) => {
  return (
    <>
      <ToasterProvider />
      <LoginModal />
      <RegisterModal />
    </>
  )
}

export default RootProvider
