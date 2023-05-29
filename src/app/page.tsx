import getCurrentUser from "@/actions/getCurrentUser"
import getListings, { IListingParams } from "@/actions/getListings"
import Container from "@/components/global/Container"
import EmptyState from "@/components/global/EmptyState"
import ListingCard from "@/components/global/Listings/ListingCard"
import { Listing } from "@prisma/client"

export interface HomeProps {
  searchParams: IListingParams
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams)
  const currentUser = await getCurrentUser()

  if (listings.length === 0) {
    return <EmptyState showReset />
  }
  return (
    <Container>
      <div
        className="
        pt-24
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
        {listings.map((listing: Listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default Home
