import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../common/FormError";
import useAxios from "../../../hooks/useAxios";
import { Container, Form } from "react-bootstrap";
import { BASE_URL, GUESTHOUSES_ENDPOINT } from "../../../constants/api";
import { editSchema } from "../../../schemas/editSchema";
import styles from "./Edit.module.css";
import DeleteGuesthouseButton from "../../buttons/DeleteGuesthouseButton";

export default function EditGuesthouse() {
  const [guesthouse, setGuesthouse] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [fetchingGuesthouse, setFetchingGuesthouse] = useState(true);
  const [updatingGuesthouse, setUpdatingGuesthouse] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(editSchema),
  });

  const http = useAxios();
  const { id } = useParams();
  const url = `${BASE_URL}${GUESTHOUSES_ENDPOINT}/${id}`;

  useEffect(() => {
    async function getGuesthouse() {
      try {
        const response = await http.get(url);
        setGuesthouse(response.data);
      } catch (error) {
        setFetchError(error.toString());
      } finally {
        setFetchingGuesthouse(false);
      }
    }
    getGuesthouse();
  }, [url, http]);

  async function onSubmit(data) {
    setUpdatingGuesthouse(true);
    setUpdateError(null);
    setUpdated(false);
    console.log("sending...", data);
    try {
      const response = await http.put(url, data);
      console.log(response.data);
      setUpdated(true);
    } catch (error) {
      setUpdateError(error.toString());
    } finally {
      setUpdatingGuesthouse();
    }
  }

  if (fetchingGuesthouse) return <div>Loading...</div>;

  if (fetchError) return <div>Error loading the guesthouse</div>;

  return (
    <Container className={styles.wrapper}>
      <h3>{guesthouse.title}</h3>
      <Form onSubmit={handleSubmit((data) => onSubmit(data))}>
        {updated && <div className="success">The guesthouse was updated</div>}

        {updateError && <FormError>{updateError}</FormError>}
        <div>
          <img src={guesthouse.image_url} width="100%" alt={guesthouse.title} />
        </div>
        <fieldset disabled={updatingGuesthouse}>
          <Form.Group>
            <Form.Label>Guesthouse name: </Form.Label>
            <Form.Control
              name="name"
              defaultValue={guesthouse.name}
              ref={register}
            />
            {errors.name && <FormError>{errors.name.message}</FormError>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Guesthouse shortdescription: </Form.Label>
            <Form.Control
              name="smalldescription"
              defaultValue={guesthouse.smalldescription}
              ref={register}
            />
            {errors.smalldescription && (
              <FormError>{errors.smalldescription.message}</FormError>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Guesthouse description 1: </Form.Label>
            <Form.Control
              name="description1"
              defaultValue={guesthouse.description1}
              ref={register}
            />
            {errors.description1 && (
              <FormError>{errors.description1.message}</FormError>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Guesthouse address: </Form.Label>
            <Form.Control
              name="description3"
              defaultValue={guesthouse.description3}
              ref={register}
            />
            {errors.description3 && (
              <FormError>{errors.description3.message}</FormError>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Prices: </Form.Label>
            <Form.Control
              name="prices"
              defaultValue={guesthouse.prices}
              ref={register}
            />
            {errors.prices && <FormError>{errors.prices.message}</FormError>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Image 1 </Form.Label>
            <Form.Control
              name="img1"
              defaultValue={guesthouse.img1}
              ref={register}
            />
            {errors.img1 && <FormError>{errors.img1.message}</FormError>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Image 2 </Form.Label>
            <Form.Control
              name="img2"
              defaultValue={guesthouse.img2}
              ref={register}
            />
            {errors.img2 && <FormError>{errors.img2.message}</FormError>}
          </Form.Group>{" "}
          <Form.Group>
            <Form.Label>Image 3 </Form.Label>
            <Form.Control
              name="img3"
              defaultValue={guesthouse.img3}
              ref={register}
            />
            {errors.img3 && <FormError>{errors.img3.message}</FormError>}
          </Form.Group>{" "}
          <Form.Group>
            <Form.Label>Image 4 </Form.Label>
            <Form.Control
              name="img4"
              defaultValue={guesthouse.img4}
              ref={register}
            />
            {errors.img4 && <FormError>{errors.img4.message}</FormError>}
          </Form.Group>
          <button className={styles.button} type="submit">
            Update
          </button>
          <hr />
          <DeleteGuesthouseButton id={guesthouse.id} name={guesthouse.name} />
        </fieldset>
      </Form>
    </Container>
  );
}
