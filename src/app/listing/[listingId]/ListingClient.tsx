"use client"
import Container from "@/components/global/Container"
import ListingHead from "@/components/global/Listings/ListingHead"
import ListingInfo from "@/components/global/Listings/ListingInfo"
import { categories } from "@/components/global/navbar/Categories"
import { Listing, Reservation, User } from "@prisma/client"
import { FC, useMemo } from "react"

interface ListingClientProps {
  reservation?: Reservation[]
  listing: Listing & { user: User }
  currentUser?: User | null
}
const ListingClient: FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservation,
}) => {
  const category = useMemo(() => {
    return categories.find(
      (category) =>
        category.label.toLowerCase().replace(/\s/g, "-") ===
        listing.category.toLowerCase().replace(/\s/g, "-")
    )
  }, [listing.category])

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-7
            md:gap-10
            mt-6
          "
          >
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient
