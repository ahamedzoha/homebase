"use client"
import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { useCallback, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import useLoginModal from "@/hooks/useLoginModal"
import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../inputs/Input"
import { toast } from "react-hot-toast"
import Button from "@/components/Button"
import useRegisterModal from "@/hooks/useRegisterModal"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

const LoginModal = () => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.ok) {
          toast.success(`Welcome back!`)
          router.refresh()
          loginModal.onClose()
        }

        if (callback?.error) {
          toast.error(callback.error)
        }
      })
      .catch((err) => {
        console.log(err)
        toast.error(`Something went wrong!`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const socialLogin = useCallback(
    (provider: string) => {
      setIsLoading(true)
      signIn(provider)
        .then((callback) => {
          if (callback?.ok) {
            toast.success(`Welcome!`)
            loginModal.onClose()
          }

          if (callback?.error) {
            toast.error(callback.error)
          }
        })
        .catch((err) => {
          console.log(err)
          toast.error(`Something went wrong!`)
        })
        .finally(() => {
          setIsLoading(false)
        })
    },
    [loginModal]
  )

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome back to HomeBase"
        subtitle="Log in to your account!"
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => socialLogin("google")}
      />
      <Button
        outline
        label="Continue with GitHub"
        icon={AiFillGithub}
        onClick={() => socialLogin("github")}
      />
      <div
        className="
        text-neutral-500
        text-center
        mt-4
        font-light
      "
      >
        <div className="flex flex-row justify-center items-center gap-2">
          <div className="">Already Have an account?</div>
          <div
            onClick={loginModal.onClose}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Log In"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal
