"use client"
import useCountries from "@/hooks/useCountries"
import { Listing, Reservation, User } from "@prisma/client"
import { useRouter } from "next/navigation"
import React, { FC, useCallback, useMemo } from "react"
import { format } from "date-fns"
import Image from "next/image"
import HeartButton from "./HeartButton"
import Button from "@/components/Button"

interface ListingCardProps {
  listing: Listing
  currentUser?: User | null
  reservation?: Reservation
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string
}
const ListingCard: FC<ListingCardProps> = ({
  listing,
  currentUser,
  actionId = "",
  actionLabel,
  disabled,
  onAction,
  reservation,
}) => {
  const router = useRouter()

  const { getByValue } = useCountries()

  const location = getByValue(listing.locationValue)

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      if (disabled) return

      onAction?.(actionId)
    },
    [onAction, disabled, actionId]
  )

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice
    }

    return listing.price
  }, [reservation, listing.price])

  const reservationDate = useMemo(() => {
    if (!reservation) return null

    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    return `${format(start, "PP")} - ${format(end, "PP")}`
  }, [reservation])

  return (
    <div
      onClick={() => router.push(`/listing/${listing.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
                aspect-square
                w-full
                relative
                overflow-hidden
                rounded-xl
            "
        >
          <Image
            fill
            src={listing.imageSrc}
            alt={listing.title}
            className="
                object-cover
                h-full
                w-full
                group-hover:scale-110
                duration-700
                ease-in-out
                transition
                "
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={listing.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || listing.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            label={actionLabel}
            small
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  )
}

export default ListingCard
