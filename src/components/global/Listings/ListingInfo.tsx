import Avatar from "@/components/Avatar"
import useCountries from "@/hooks/useCountries"
import { User } from "@prisma/client"
import { FC } from "react"
import { IconType } from "react-icons"
import ListingCategory from "./ListingCategory"

interface ListingInfoProps {
  user: User
  category:
    | {
        label: string
        icon: IconType
        description: string
      }
    | undefined
  description: string
  roomCount: number
  guestCount: number
  bathroomCount: number
  locationValue: string
}

const ListingInfo: FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}) => {
  const { getByValue } = useCountries()
  const coordinates = getByValue(locationValue)?.latlng

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            text-xl
            font-semibold
            flex
            flex-row
            items-center
            gap-2
        "
        >
          <div className="">Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div
          className="
            flex
            flex-row
            items-center
            font-light
            gap-4
            text-neutral-500
        "
        >
          <div className="">{guestCount} guests</div>
          <div className="">{roomCount} rooms</div>
          <div className="">{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
    </div>
  )
}

export default ListingInfo
