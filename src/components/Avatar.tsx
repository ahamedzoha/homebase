"use client"

import Image from "next/image"
import { FC } from "react"

interface AvatarProps {
  src?: string | null
}
const Avatar: FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      className="rounded-full"
      src={src || "/images/placeholder.jpg"}
      alt="Avatar Logo"
      height={30}
      width={30}
    />
  )
}

export default Avatar
