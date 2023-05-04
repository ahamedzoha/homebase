"use client"
import useRentModal from "@/hooks/useRentModal"
import Modal from "./Modal"
import { useMemo, useState } from "react"
import Heading from "../Heading"
import { categories } from "../navbar/Categories"
import CategoryInput from "../inputs/CategoryInput"
import { FieldValues, useForm } from "react-hook-form"
import CountrySelect from "../inputs/CountrySelect"
import dynamic from "next/dynamic"
import Counter from "../inputs/Counter"
import ImageUpload from "../inputs/ImageUpload"
// import Map from "../Map"

enum RENT_MODAL_STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const [step, setStep] = useState<RENT_MODAL_STEPS>(RENT_MODAL_STEPS.CATEGORY)

  const rentModal = useRentModal()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 0,
      title: "",
      description: "",
    },
  })

  const category = watch("category")
  const location = watch("location")
  const guestCount = watch("guestCount")
  const bathroomCount = watch("bathroomCount")
  const roomCount = watch("roomCount")
  const imageSrc = watch("imageSrc")
  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  )

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const onBack = () => {
    if (step !== RENT_MODAL_STEPS.CATEGORY) {
      setStep((prev) => prev - 1)
    }
  }
  const onNext = () => {
    if (step !== RENT_MODAL_STEPS.PRICE) {
      setStep((prev) => prev + 1)
    }
  }

  const actionLabel = useMemo(() => {
    if (step === RENT_MODAL_STEPS.PRICE) {
      return "Create"
    }
    return "Next"
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === RENT_MODAL_STEPS.CATEGORY) {
      return undefined
    }
    return "Back"
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="What type of HomeBase are you renting?"
        subtitle="Select a category"
      />
      <div
        className="grid 
            grid-cols-1
            md:grid-cols-2
            gap-3
            max-h-[50vh]
            overflow-y-auto
            "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              description={item.description}
              icon={item.icon}
              label={item.label}
              selected={category === item.label}
              onClick={(category) => setCustomValue("category", category)}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === RENT_MODAL_STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your HomeBase located?"
          subtitle="Help guests find your HomeBase by providing a location!"
        />
        <CountrySelect
          onChange={(value) => setCustomValue("location", value)}
          value={location}
        />
        <Map center={location?.latlng} />
      </div>
    )
  }

  if (step === RENT_MODAL_STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Some basic information about your place"
          subtitle="What amenities do you offer?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
        <hr />
      </div>
    )
  }

  if (step === RENT_MODAL_STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add photos of your HomeBase"
          subtitle="Showcase your HomeBase with high quality photos!"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      title="Set up your HomeBase"
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === RENT_MODAL_STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  )
}

export default RentModal
