"use client"
import Container from "@/components/global/Container"
import Logo from "@/components/global/Logo"
import Search from "@/components/global/navbar/Search"
import UserMenu from "./UserMenu"
import { User } from "@prisma/client"
import { FC } from "react"
import Categories from "./Categories"

interface NavbarProps {
  currentUser?: User | null
}
const Navbar: FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div
            className="
            flex
            flex-row
            justify-between
            items-center
            gap-3
            md:gap-0
            "
          >
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  )
}

export default Navbar
