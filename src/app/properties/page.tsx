import getCurrentUser from "@/actions/getCurrentUser"
import getReservations from "@/actions/getReservations"
import EmptyState from "@/components/global/EmptyState"
import PropertiesClient from "./PropertiesClient"
import getListings from "@/actions/getListings"

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="You must be logged in to view this page"
        showReset
      />
    )
  }

  const listings = await getListings({ userId: currentUser.id })

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No Properties Found"
        subtitle="You have no Properties at this time"
        showReset
      />
    )
  }
  return <PropertiesClient currentUser={currentUser} listings={listings} />
}

export default PropertiesPage
