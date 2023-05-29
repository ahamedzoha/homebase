import getCurrentUser from "@/actions/getCurrentUser"
import getReservations from "@/actions/getReservations"
import EmptyState from "@/components/global/EmptyState"
import TripsClient from "./TripsClient"

const TripsPage = async () => {
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

  const reservations = await getReservations({ userId: currentUser.id })

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No Trips Found"
        subtitle="You have no trips at this time"
        showReset
      />
    )
  }
  return <TripsClient currentUser={currentUser} reservations={reservations} />
}

export default TripsPage
