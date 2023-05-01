import Container from "../Container"
import { TbBeach, TbPool, TbDog } from "react-icons/tb"
import { GiWindmill } from "react-icons/gi"
import { MdOutlineVilla } from "react-icons/md"
import CategoryBox from "../CategoryBox"
import { usePathname, useSearchParams } from "next/navigation"

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Pool",
    icon: TbPool,
    description: "This property has a pool!",
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
]

const Categories = () => {
  const params = useSearchParams()
  const categoryParam = params?.get("category")
  const pathName = usePathname()

  const isMainPage = pathName === "/"

  if (!isMainPage) {
    return null
  }

  console.log(categoryParam)

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
