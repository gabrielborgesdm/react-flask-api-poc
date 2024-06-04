import * as yup from "yup";

const AuthorSchema = yup
  .object({
    name: yup.string().required().min(1).max(300),
    email: yup.string().email().min(1).max(320),
    nationality: yup.string().min(1).max(100),
    birthDate: yup.string().matches(/^(?:(?:19|20)\d{2})-(?:(?:0[1-9]|1[0-2]))-(?:(?:0[1-9]|[12]\d|3[01]))$/, {
      message: "Follow the format AAAA-MM-DD",
    }),
  })
  .required();

export default AuthorSchema;
