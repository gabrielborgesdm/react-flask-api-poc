import React, { useState } from "react";
import { AuthorFormCreate } from "types/author";
import Input from "../../components/Form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthorSchema from "../../components/Schemas/AuthorSchema";
import Form, { FormMessage } from "../../components/Form/Form";
import ManagementService from "services/managementService";

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
    if (author) onReset();
    setMessage({
      value: author ? "Author created with success" : "It wasn't possible to create the author, try again",
      isError: author === undefined,
    });
    setIsLoading(false);
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
        <div className="sm:col-span-3">
          <Input label="Author name" name="name" register={register} errorMessage={errors.name?.message} />
        </div>
        <div className="sm:col-span-3">
          <Input label="Email address" name="email" register={register} errorMessage={errors.email?.message} />
        </div>
        <div className="sm:col-span-3">
          <Input
            label="Nationality"
            name="nationality"
            register={register}
            errorMessage={errors.nationality?.message}
          />
        </div>
        <div className="sm:col-span-3">
          <Input label="Birth date" name="birthDate" register={register} errorMessage={errors.birthDate?.message} />
        </div>
      </>
    </Form>
  );
};

export default AuthorForm;
