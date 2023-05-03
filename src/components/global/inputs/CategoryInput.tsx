"use client"
import { FC } from "react"
import { IconType } from "react-icons"

interface CategoryInputProps {
  label: string
  icon: IconType
  description: string
  selected?: boolean
  onClick?: (value: string) => void
}
const CategoryInput: FC<CategoryInputProps> = ({
  label,
  icon: Icon,
  description,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick && onClick(label)}
      className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-black
        transition
        cursor-pointer
        ${selected ? `border-black` : `border-neutral-200`}
        
    `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  )
}

export default CategoryInput
