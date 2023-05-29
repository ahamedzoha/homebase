"use client"
import Container from "@/components/global/Container"
import Heading from "@/components/global/Heading"
import ListingCard from "@/components/global/Listings/ListingCard"
import { Listing, Reservation, User } from "@prisma/client"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { FC, useCallback, useState } from "react"
import { toast } from "react-hot-toast"

interface PropertiesClientProps {
  listings: Listing[]
  currentUser?: User | null
}
const PropertiesClient: FC<PropertiesClientProps> = ({
  listings = [],
  currentUser,
}) => {
  const [deletingId, setDeletingId] = useState<string | null>("")
  const router = useRouter()

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Homebase deleted successfully!")
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
      <Heading title="Your Properties" subtitle="Manage your Homebases" />
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
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete Homebase"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default PropertiesClient
