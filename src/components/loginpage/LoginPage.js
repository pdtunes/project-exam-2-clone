import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL } from "../../constants/api";
import FormError from "../common/FormError";
import { Container, Form } from "react-bootstrap";
import styles from "./LoginForm.module.css";
import { loginSchema } from "../../schemas/loginSchema";

export default function LoginPage() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [, setAuth] = useContext(AuthContext);

  const history = useHistory();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginSchema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);
    try {
      const response = await axios.post(url, data);
      setAuth(response.data);
      history.push("/admin");
    } catch (error) {
      setLoginError(error.toString());
    }
  }

  return (
    <>
      <Container className="main">
        <h3> Admin login </h3>
        <Form className={styles.formwrap} onSubmit={handleSubmit(onSubmit)}>
          {loginError && <FormError>{loginError}</FormError>}
          <fieldset disabled={submitting}>
            <Form.Group className={styles.form}>
              <Form.Label>Username </Form.Label>
              <Form.Control
                name="identifier"
                placeholder="Username"
                ref={register}
              />
              {errors.identifier && (
                <FormError>{errors.identifier.message}</FormError>
              )}
            </Form.Group>
            <Form.Group className={styles.form}>
              <Form.Label>Password </Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                ref={register}
              />
              {errors.password && (
                <FormError>{errors.password.message}</FormError>
              )}
            </Form.Group>
            <button className={styles.button}>
              {submitting ? "Sending" : "Submit"}
            </button>
          </fieldset>
        </Form>
      </Container>
    </>
  );
}

const url = `${BASE_URL}/auth/local`;
