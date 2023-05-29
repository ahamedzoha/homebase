"use client"
import Container from "@/components/global/Container"
import Heading from "@/components/global/Heading"
import ListingCard from "@/components/global/Listings/ListingCard"
import { Listing, Reservation, User } from "@prisma/client"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { FC, useCallback, useState } from "react"
import { toast } from "react-hot-toast"

interface ReservationsClientProps {
  currentUser?: User | null
  reservations: (Reservation & { listing: Listing })[]
}
const ReservationsClient: FC<ReservationsClientProps> = ({
  currentUser,
  reservations = [],
}) => {
  const [deletingId, setDeletingId] = useState<string | null>("")
  const router = useRouter()

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled successfully!")
          router.refresh()
        })
        .catch((err: AxiosError) => {
          toast.error("Something went wrong!")
          console.log(err.response?.data)
        })
        .finally(() => {
          setDeletingId("")
        })
    },
    [router]
  )

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div
        className="
            mt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8

        "
      >
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            listing={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel Guest Reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default ReservationsClient
