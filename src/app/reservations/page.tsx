import getCurrentUser from "@/actions/getCurrentUser"
import getReservations from "@/actions/getReservations"
import EmptyState from "@/components/global/EmptyState"
import ReservationsClient from "./ReservationsClient"

const ReservationPage = async () => {
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

  const reservations = await getReservations({ authorId: currentUser.id })
  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No Reservations Found"
        subtitle="You have no reservations at your properties this time"
        showReset
      />
    )
  }
  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  )
}

export default ReservationPage
