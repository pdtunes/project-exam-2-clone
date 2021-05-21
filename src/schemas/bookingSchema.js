import * as yup from "yup";
const emailRegChecker = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

export const bookingSchema = yup.object().shape({
  firstname: yup.string().required("Please enter your firstname"),
  lastname: yup.string().required("Please enter your lastname"),
  email: yup
    .string()
    .required("Please enter an valid email")
    .matches(emailRegChecker, "Must be a valid Email"),
  telephone: yup.string().required("Please enter your phonenumber"),
  persons: yup.number().required("Please enter number of persons"),
  datefrom: yup.date().required("Please pick a valid date"),
  dateto: yup.date().required("Please pick a valid date"),
});
