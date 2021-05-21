import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../common/FormError";
import { BASE_URL, GUESTHOUSES_ENDPOINT } from "../../../constants/api";
import useAxios from "../../../hooks/useAxios";
import styles from "./AddBabs.module.css";
import { addSchema } from "../../../schemas/addSchema";

export default function AddGhs() {
  const [submitting, setSubmitting] = useState(false);

  const history = useHistory();
  const http = useAxios();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(addSchema),
  });

  const url = `${BASE_URL}${GUESTHOUSES_ENDPOINT}`;

  async function onSubmit(data) {
    setSubmitting(true);

    try {
      const response = await http.post(url, data);
      history.push("/admin");
    } catch (err) {
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Container className="main">
      <Form className={styles.formwrap} onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={submitting}>
          <Form.Group>
            <Form.Label>Guesthouse Name: </Form.Label>
            <Form.Control
              name="name"
              placeholder="e.g (Radisson Blu)"
              ref={register}
            />
            {errors.name && <FormError>{errors.name.message}</FormError>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Short description </Form.Label>
            <Form.Control
              name="smalldescription"
              placeholder="(e.g 4-star bed and breakfast with 2 restaurants, near Hurtigruten Terminal)"
              ref={register}
            />
            {errors.smalldescription && (
              <FormError>{errors.smalldescription.message}</FormError>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Description 1 </Form.Label>
            <Form.Control
              name="description1"
              placeholder="e.g (This hotel has 249 rooms
                This hotel is arranged over 6 floor)"
              ref={register}
            />
            {errors.description1 && (
              <FormError>{errors.description1.message}</FormError>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Address </Form.Label>
            <Form.Control
              name="description3"
              placeholder="e.g (Nedre Ole Bulls Plass 4, Bergen City Centre, Bergen, Hordaland, N-5807, Norge)"
              ref={register}
            />
            {errors.description3 && (
              <FormError>{errors.description3.message}</FormError>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Prices </Form.Label>
            <Form.Control
              name="prices"
              placeholder="e.g (1639)"
              ref={register}
            />
            {errors.prices && <FormError>{errors.prices.message}</FormError>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Images </Form.Label>
            <Form.Control
              name="img1"
              placeholder="e.g (https://res.cloudinary.com/dgeiq2r6e/image/upload/v1617967179/holidaze/hotels/norge/1.webp)"
              ref={register}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              name="img2"
              placeholder="e.g (https://res.cloudinary.com/dgeiq2r6e/image/upload/v1617967179/holidaze/hotels/norge/1.webp)"
              ref={register}
            />
          </Form.Group>{" "}
          <Form.Group>
            <Form.Control
              name="img3"
              placeholder="e.g (https://res.cloudinary.com/dgeiq2r6e/image/upload/v1617967179/holidaze/hotels/norge/1.webp)"
              ref={register}
            />
          </Form.Group>{" "}
          <Form.Group>
            <Form.Control
              name="img4"
              placeholder="e.g (https://res.cloudinary.com/dgeiq2r6e/image/upload/v1617967179/holidaze/hotels/norge/1.webp)"
              ref={register}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Lists </Form.Label>
            <Form.Control
              name="list1"
              placeholder="e.g Hardangerfjord - 5.2 mi / 8.4 km"
              ref={register}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              name="list2"
              placeholder="e.g Hardangerfjord - 5.2 mi / 8.4 km"
              ref={register}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              name="list3"
              placeholder="e.g Hardangerfjord - 5.2 mi / 8.4 km"
              ref={register}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              name="list4"
              placeholder="e.g Hardangerfjord - 5.2 mi / 8.4 km"
              ref={register}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              name="list5"
              placeholder="e.g Hardangerfjord - 5.2 mi / 8.4 km"
              ref={register}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              name="list6"
              placeholder="e.g Hardangerfjord - 5.2 mi / 8.4 km"
              ref={register}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              name="list7"
              placeholder="e.g Hardangerfjord - 5.2 mi / 8.4 km"
              ref={register}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              name="list8"
              placeholder="e.g Hardangerfjord - 5.2 mi / 8.4 km"
              ref={register}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Type </Form.Label>
            <Form.Control
              name="type"
              placeholder="e.g bab / hotel / guesthouse"
              ref={register}
            />
          </Form.Group>
          <div className={styles.buttonWrap}>
            <button className={styles.button}>
              {submitting ? "Sending" : "Submit"}
            </button>
          </div>
        </fieldset>
      </Form>
    </Container>
  );
}
