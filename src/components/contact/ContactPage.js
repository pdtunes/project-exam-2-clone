import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSchema } from "../../schemas/contactSchema";
import { BASE_URL, CONTACTS_ENDPOINT } from "../../constants/api";
import FormError from "../common/FormError";
import { useHistory } from "react-router-dom";
import styles from "./ContactPage.module.css";

const url = `${BASE_URL}${CONTACTS_ENDPOINT}`;

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [contactError, setLoginError] = useState(null);
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(contactSchema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);
    try {
      const response = await axios.post(url, data);
      history.push("/contactconfirmation");
    } catch (error) {
      setLoginError(error.toString());
    }
  }

  return (
    <>
      <Container className={styles.container}>
        <h3 className={styles.header}> Contact us </h3>
        <Form className={styles.formwrap} onSubmit={handleSubmit(onSubmit)}>
          {contactError && <FormError>{contactError}</FormError>}
          <fieldset disabled={submitting}>
            <Form.Group className={styles.form}>
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
            <Form.Group className={styles.form}>
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
            <Form.Group className={styles.form}>
              <Form.Label>Email </Form.Label>
              <Form.Control
                name="email"
                placeholder="Your Email"
                ref={register}
              />
              {errors.email && <FormError>{errors.email.message}</FormError>}
            </Form.Group>
            <Form.Group className={styles.form}>
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

            <Form.Group className={styles.form}>
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
