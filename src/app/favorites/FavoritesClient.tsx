import Container from "@/components/global/Container"
import Heading from "@/components/global/Heading"
import ListingCard from "@/components/global/Listings/ListingCard"
import { Listing, User } from "@prisma/client"
import { FC } from "react"

interface FavoritesClientProps {
  listings: Listing[]
  currentUser?: User | null
}
const FavoritesClient: FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="Your favorite listings" />
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
            currentUser={currentUser}
            listing={listing}
          />
        ))}
      </div>
    </Container>
  )
}

export default FavoritesClient
