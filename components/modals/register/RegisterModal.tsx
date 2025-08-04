"use client";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "../Modal";
import Heading from "../../Heading";
import Input from "../../Input";
import { registerFields } from "./fields";
import Button from "@/components/Button";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const registerModal = useRegisterModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      passowrd: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => registerModal.onClose())
      .catch((err) => toast.error(`Something went wrong: ${err.message}`))
      .finally(() => setIsLoading(false));
  };

  const footerContent = (
    <div className="flex flex-col gap-3 mt-3">
      <hr />
      <Button
        outline
        label="Continue with google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div className="flex flex-row justify-center items-center gap-2 mt-4 ">
        <span className="inline-block font-light text-neutral-500 ">
          Already have an account?
        </span>
        <span
          className="inline-block font-semibold text-neutral-800 cursor-pointer"
          onClick={registerModal.onClose}
        >
          Log-in
        </span>
      </div>
    </div>
  );

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account" />
      {registerFields.map((field) => (
        <Input key={field.id} register={register} {...field} errors={errors} />
      ))}
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    ></Modal>
  );
};

export default RegisterModal;
