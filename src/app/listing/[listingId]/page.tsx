import getCurrentUser from "@/actions/getCurrentUser"
import getListingById from "@/actions/getListingById"
import EmptyState from "@/components/global/EmptyState"
import ListingClient from "./ListingClient"
import getReservations from "@/actions/getReservations"

interface IParams {
  listingId?: string
}
const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params)
  const currentUser = await getCurrentUser()
  const reservations = await getReservations(params)

  if (!listing) {
    return (
      <EmptyState
        title="Invalid ID"
        subtitle="This Listing is either removed or doesn't exist"
        showReset
      />
    )
  }
  return (
    <ListingClient
      reservations={reservations}
      listing={listing}
      currentUser={currentUser}
    />
  )
}

export default ListingPage
