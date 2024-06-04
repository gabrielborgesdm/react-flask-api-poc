import React, { useState } from "react";
import Input from "./Form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthorSchema from "./Schemas/AuthorSchema";
import Form, { FormMessage } from "./Form/Form";
import ManagementService from "services/managementService";
import { AuthorFormCreate } from "types/author";

const managementService = new ManagementService();

const AuthorForm: React.FC = () => {
  const messageInitialState = { value: "", isError: false };
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<FormMessage>(messageInitialState);
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm({ resolver: yupResolver(AuthorSchema) });

  const onSubmit: SubmitHandler<AuthorFormCreate> = async (data: AuthorFormCreate) => {
    setIsLoading(true);
    const author = await managementService.createAuthor(data);
    console.log(author, author === undefined);
    setMessage({
      value: author ? "Author created with success" : "It wansn't possible to create the author, try again",
      isError: author === undefined,
    });
    setIsLoading(false);
    // onReset()
  };

  const onReset = () => {
    setMessage(messageInitialState);
    reset(undefined);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onReset={onReset}
      title="Author Creation"
      description="Enter the author details"
      message={message}
      isLoading={isLoading}
    >
      <>
        <Input label="Author name" name="name" register={register} errorMessage={errors.name?.message} />

        <Input label="Email address" name="email" register={register} errorMessage={errors.email?.message} />

        <Input label="Nationality" name="nationality" register={register} errorMessage={errors.nationality?.message} />

        <Input label="Birth date" name="birthDate" register={register} errorMessage={errors.birthDate?.message} />
      </>
    </Form>
  );
};

export default AuthorForm;
