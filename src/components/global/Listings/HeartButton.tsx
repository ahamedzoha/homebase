"use client"

import { User } from "@prisma/client"
import { FC } from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

interface HeartButtonProps {
  listingId: string
  currentUser?: User | null
}

const HeartButton: FC<HeartButtonProps> = ({ listingId, currentUser }) => {
  const hasFavorited = false
  const toggleFavorite = () => {}
  return (
    <div
      onClick={toggleFavorite}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
        "
    >
      <AiOutlineHeart size={28} className="fill-white absolute " />
      <AiFillHeart
        size={28}
        className={`
         
          
            ${hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
        `}
      />
    </div>
  )
}

export default HeartButton