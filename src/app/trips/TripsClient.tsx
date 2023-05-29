"use client"
import Container from "@/components/global/Container"
import Heading from "@/components/global/Heading"
import ListingCard from "@/components/global/Listings/ListingCard"
import { Listing, Reservation, User } from "@prisma/client"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { FC, useCallback, useState } from "react"
import { toast } from "react-hot-toast"
interface TripsClientProps {
  reservations: (Reservation & { listing: Listing })[]
  currentUser?: User | null
}
const TripsClient: FC<TripsClientProps> = ({
  reservations = [],
  currentUser,
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
        })
        .catch((err: AxiosError) => {
          toast.error("Something went wrong!")
          console.log(err.response?.data)
        })
        .finally(() => {
          setDeletingId("")
          router.refresh()
        })
    },
    [router]
  )

  return (
    <Container>
      <Heading title="Trips" subtitle="Where you're going, where you've been" />
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
            actionLabel="Cancel Reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default TripsClient
