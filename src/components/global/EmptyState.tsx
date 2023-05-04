"use client"

import { useRouter } from "next/navigation"
import { FC } from "react"
import Heading from "./Heading"
import Button from "../Button"

interface EmptyStateProps {
  title?: string
  subtitle?: string
  showReset?: boolean
}
const EmptyState: FC<EmptyStateProps> = ({
  title = "No exact matches found",
  subtitle = "Try adjusting your search or filters to find what you're looking for.",
  showReset,
}) => {
  const router = useRouter()
  return (
    <div
      className="
    h-[60vh]
    flex
    flex-col
    items-center
    justify-center
    gap-2
    "
    >
      <Heading title={title} subtitle={subtitle} center />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Reset filters"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  )
}

export default EmptyState
