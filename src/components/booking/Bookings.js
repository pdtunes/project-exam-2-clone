import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookingSchema } from "../../schemas/bookingSchema";
import { BASE_URL, BOOKINGS_ENDPOINT } from "../../constants/api";
import FormError from "../common/FormError";
import { useHistory } from "react-router-dom";
import styles from "./Bookings.module.css";

const url = `${BASE_URL}${BOOKINGS_ENDPOINT}`;

export default function Booking({
  hotelid,
  hotelname,
  ghid,
  ghname,
  babid,
  babname,
}) {
  const [submitting, setSubmitting] = useState(false);
  const [bookingError, setLoginError] = useState(null);
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(bookingSchema),
  });

  async function onSubmit(data) {
    data.hotelid = hotelid;
    data.hotelname = hotelname;
    data.ghname = ghname;
    data.ghid = ghid;
    data.babname = babname;
    data.babid = babid;

    setSubmitting(true);
    setLoginError(null);
    try {
      const response = await axios.post(url, data);
      history.push("/bookingconfirmation");
    } catch (error) {
      setLoginError(error.toString());
    }
  }

  return (
    <>
      <Container className={styles.bookWrap}>
        <h4>Book now</h4>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {bookingError && <FormError>{bookingError}</FormError>}
          <fieldset disabled={submitting}>
            <Form.Group>
              <Form.Label>First name </Form.Label>
              <Form.Control
                name="firstname"
                placeholder="First name"
                ref={register}
              />
              {errors.firstname && (
                <FormError>{errors.firstname.message}</FormError>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Last name </Form.Label>
              <Form.Control
                name="lastname"
                placeholder="Last name"
                ref={register}
              />
              {errors.lastname && (
                <FormError>{errors.lastname.message}</FormError>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Email </Form.Label>
              <Form.Control
                name="email"
                placeholder="Your Email"
                ref={register}
              />
              {errors.email && <FormError>{errors.email.message}</FormError>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Telephone </Form.Label>
              <Form.Control
                name="telephone"
                placeholder="Your phonenumber"
                ref={register}
              />
              {errors.telephone && (
                <FormError>{errors.telephone.message}</FormError>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Persons </Form.Label>
              <Form.Control
                name="persons"
                placeholder="1"
                type="number"
                ref={register}
              />
              {errors.persons && (
                <FormError>{errors.persons.message}</FormError>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Date from </Form.Label>
              <Form.Control
                name="datefrom"
                placeholder=""
                type="date"
                ref={register}
              />
              {errors.date && <FormError>{errors.date.message}</FormError>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Date to </Form.Label>
              <Form.Control
                name="dateto"
                placeholder=""
                type="date"
                ref={register}
              />
              {errors.date && <FormError>{errors.date.message}</FormError>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Message </Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                placeholder=""
                type="textarea"
                ref={register}
                rows={3}
              />

              {errors.message && (
                <FormError>{errors.message.message}</FormError>
              )}
            </Form.Group>
            <div className={styles.buttonWrap}>
              <button className={styles.button}>
                {submitting ? "Sending" : "Submit"}
              </button>
            </div>
          </fieldset>
        </Form>
      </Container>
    </>
  );
}
