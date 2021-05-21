import * as yup from "yup";

const emailRegChecker = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

export const contactSchema = yup.object().shape({
  firstname: yup.string().required("Please enter your firstname"),
  lastname: yup.string().required("Please enter your lastname"),
  email: yup
    .string()
    .required("Please enter an valid email")
    .matches(emailRegChecker, "Must be a valid Email"),
  telephone: yup.string().required("Please enter your phonenumber"),
  message: yup.string().min(10).required(),
});
