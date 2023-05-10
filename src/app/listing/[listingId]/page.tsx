import getCurrentUser from "@/actions/getCurrentUser"
import getListingById from "@/actions/getListingById"
import EmptyState from "@/components/global/EmptyState"
import ListingClient from "./ListingClient"

interface IParams {
  listingId?: string
}
const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params)
  const currentUser = await getCurrentUser()

  if (!listing) {
    return (
      <EmptyState
        title="Invalid ID"
        subtitle="This Listing is either removed or doesn't exist"
        showReset
      />
    )
  }
  return <ListingClient listing={listing} currentUser={currentUser} />
}

export default ListingPage
