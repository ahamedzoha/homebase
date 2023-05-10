"use client"
import { FC } from "react"
import { IconType } from "react-icons"

interface ListingCategoryProps {
  icon: IconType
  label: string
  description: string
}
const ListingCategory: FC<ListingCategoryProps> = ({
  icon,
  label,
  description,
}) => {
  return (
    <div>
      <div className=""></div>
      Enter
    </div>
  )
}

export default ListingCategory
