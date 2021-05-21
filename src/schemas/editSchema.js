import * as yup from "yup";
export const editSchema = yup.object().shape({
  name: yup.string().required("Please enter a valid guesthouse name"),
  smalldescription: yup
    .string()
    .required("Please enter a valid short description"),
  description1: yup.string().required("Please enter a valid description"),
  description3: yup.string().required("Please enter a valid address"),
  prices: yup.string().required("Please enter a valid price"),
});
