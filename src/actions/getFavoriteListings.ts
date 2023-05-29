import prisma from "@/libs/prismadb"
import getCurrentUser from "./getCurrentUser"
import { Listing } from "@prisma/client"

const getFavoriteListings = async (): Promise<Listing[]> => {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return []
    }
    const favoriteListings = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    })

    return favoriteListings
  } catch (error) {
    console.error(error)
    return []
  }
}

export default getFavoriteListings
