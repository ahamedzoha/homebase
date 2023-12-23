"use client"
import useSearchModal from "@/hooks/useSearchModal"
import Modal from "./Modal"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import { Range } from "react-date-range"
import dynamic from "next/dynamic"
import { CountrySelectValue } from "../inputs/CountrySelect"
import queryString from "query-string"
import { formatISO } from "date-fns"

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const [step, setStep] = useState<STEPS>(STEPS.LOCATION)
  const [guestCount, setGuestCount] = useState<number>(1)
  const [roomCount, setRoomCount] = useState<number>(1)
  const [bathroomCount, setBathroomCount] = useState<number>(1)
  const [location, setLocation] = useState<CountrySelectValue>()
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  })
  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  )

  const searchModal = useSearchModal()
  const router = useRouter()
  const params = useSearchParams()

  const onBack = useCallback(() => {
    setStep((prevStep) => prevStep - 1)
  }, [])

  const onNext = useCallback(() => {
    setStep((prevStep) => prevStep + 1)
  }, [])

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext()
    }
    let currentQuery = {}

    if (params) {
      currentQuery = queryString.parse(params.toString())
    }

    const updatedQuery = {
      ...currentQuery,
      location: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    }

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO
    }
  }, [])

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={searchModal.onOpen}
      title="Filter"
      actionLabel="Search"
    />
  )
}

export default SearchModal
