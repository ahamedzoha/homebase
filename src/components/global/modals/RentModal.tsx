"use client"
import useRentModal from "@/hooks/useRentModal"
import Modal from "./Modal"
import { useMemo, useState } from "react"
import Heading from "../Heading"
import { categories } from "../navbar/Categories"
import CategoryInput from "../inputs/CategoryInput"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import CountrySelect from "../inputs/CountrySelect"
import dynamic from "next/dynamic"
import Counter from "../inputs/Counter"
import ImageUpload from "../inputs/ImageUpload"
import Input from "../inputs/Input"
import axios, { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
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
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const rentModal = useRentModal()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== RENT_MODAL_STEPS.PRICE) {
      onNext()
    } else {
      setIsLoading(true)
      axios
        .post("/api/listings", data)
        .then((res) => {
          console.log(res.data)
          toast.success("Listing created successfully!")
          router.refresh()
          reset()
          setStep(RENT_MODAL_STEPS.CATEGORY)
          rentModal.onClose()
        })
        .catch((err: AxiosError) => {
          console.log(err)
          toast.error("Something went wrong!")
          toast.error(err.message)
        })
        .finally(() => {
          setIsLoading(false)
        })
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

  if (step === RENT_MODAL_STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your HomeBase?"
          subtitle="Tell guests what makes your HomeBase special!"
        />
        <Input
          errors={errors}
          register={register}
          id="title"
          label="Title"
          disabled={isLoading}
          required
        />
        <hr />
        <Input
          errors={errors}
          register={register}
          id="description"
          label="Description"
          disabled={isLoading}
          required
        />
      </div>
    )
  }

  if (step === RENT_MODAL_STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Set your price"
          subtitle="How much do you want to charge per night?"
        />
        <Input
          formatPrice
          errors={errors}
          register={register}
          id="price"
          label="Price"
          disabled={isLoading}
          required
          type="number"
        />
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
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === RENT_MODAL_STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  )
}

export default RentModal
