import * as yup from "yup";

const BookSchema = yup
  .object({
    title: yup.string().min(1).max(300).required(),
    pages: yup.number().min(1).required(),
  })
  .required();

export default BookSchema;
