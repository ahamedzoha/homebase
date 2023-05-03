// "use client"
import Container from "../Container"
import { TbBeach, TbPool, TbDog, TbMountain } from "react-icons/tb"
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi"
import { MdOutlineVilla } from "react-icons/md"
import { FaSkiing } from "react-icons/fa"
import { BsSnow } from "react-icons/bs"
import { IoDiamond } from "react-icons/io5"
import CategoryBox from "../CategoryBox"
import { usePathname, useSearchParams } from "next/navigation"

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has a pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    label: "Pet Friendly",
    icon: TbDog,
    description: "This property is pet friendly!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake!",
  },
  {
    label: "Skiiing",
    icon: FaSkiing,
    description: "This property is close to a ski resort!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is close to a castle!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property is close to a camping site!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is in the arctic!",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is close to a cave!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property has a barn!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is luxurious!",
  },
]

const Categories = () => {
  const params = useSearchParams()
  const categoryParam = params?.get("category")
  const pathName = usePathname()

  const isMainPage = pathName === "/"

  if (!isMainPage) {
    return null
  }

  // console.log(categoryParam)

  return (
    <Container>
      <div
        className="
            pt-4
            flex
            flex-row
            items-center
            justify-between
            overflow-x-auto
        "
      >
        {categories.map((category) => (
          <CategoryBox
            key={category.label}
            label={category.label}
            description={category.description}
            icon={category.icon}
            selected={
              categoryParam === category.label.toLowerCase().replace(/\s/g, "-")
            }
          />
        ))}
      </div>
    </Container>
  )
}

export default Categories
