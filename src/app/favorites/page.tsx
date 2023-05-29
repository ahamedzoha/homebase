import getCurrentUser from "@/actions/getCurrentUser"
import getFavoriteListings from "@/actions/getFavoriteListings"
import EmptyState from "@/components/global/EmptyState"
import FavoritesClient from "./FavoritesClient"

const FavoritesPage = async () => {
  const listings = await getFavoriteListings()
  const currentUser = await getCurrentUser()

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No Favorites Found"
        subtitle="You don't have any favorites yet."
      />
    )
  }

  return <FavoritesClient listings={listings} currentUser={currentUser} />
}

export default FavoritesPage
