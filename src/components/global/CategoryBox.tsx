"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { FC, useCallback } from "react"
import { IconType } from "react-icons"
import qs from "query-string"

interface CategoryBoxProps {
  label: string
  icon: IconType
  description: string
  selected?: boolean
}

const CategoryBox: FC<CategoryBoxProps> = ({
  label,
  icon: Icon,
  description,
  selected,
}) => {
  const router = useRouter()
  const params = useSearchParams()
  //   remove spaces from label and replace with dash
  const slug = label.toLowerCase().replace(/\s/g, "-")

  const handleClick = useCallback(() => {
    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: slug,
    }

    if (params?.get("category") === slug) {
      delete updatedQuery.category
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    )

    router.push(url)
  }, [slug, params, router])

  return (
    <div
      onClick={handleClick}
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? `border-b-neutral-800` : `border-b-transparent`}
        ${selected ? `text-neutral-800` : `text-neutral-500`}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  )
}

export default CategoryBox
