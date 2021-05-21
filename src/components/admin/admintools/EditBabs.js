import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../common/FormError";
import useAxios from "../../../hooks/useAxios";
import { Container, Form } from "react-bootstrap";
import { BASE_URL, BAB_ENDPOINT } from "../../../constants/api";
import { editSchema } from "../../../schemas/editSchema";
import styles from "./Edit.module.css";
import DeleteBabButton from "../../buttons/DeleteBabButton";

export default function EditBab() {
  const [bab, setBab] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [fetchingBab, setFetchingBab] = useState(true);
  const [updatingBab, setUpdatingBab] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(editSchema),
  });

  const http = useAxios();
  const { id } = useParams();
  const url = `${BASE_URL}${BAB_ENDPOINT}/${id}`;

  useEffect(() => {
    async function getBab() {
      try {
        const response = await http.get(url);
        setBab(response.data);
      } catch (error) {
        setFetchError(error.toString());
      } finally {
        setFetchingBab(false);
      }
    }
    getBab();
  }, [url, http]);

  async function onSubmit(data) {
    setUpdatingBab(true);
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
      setUpdatingBab();
    }
  }

  if (fetchingBab) return <div>Loading...</div>;

  if (fetchError) return <div>Error loading the bab</div>;

  return (
    <Container className={styles.wrapper}>
      <h3>{bab.title}</h3>
      <Form onSubmit={handleSubmit((data) => onSubmit(data))}>
        {updated && <div className="success">The bab was updated</div>}

        {updateError && <FormError>{updateError}</FormError>}
        <div>
          <img src={bab.image_url} width="100%" alt={bab.title} />
        </div>
        <fieldset disabled={updatingBab}>
          <Form.Group>
            <Form.Label>Bab name: </Form.Label>
            <Form.Control name="name" defaultValue={bab.name} ref={register} />
            {errors.name && <FormError>{errors.name.message}</FormError>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Bab shortdescription: </Form.Label>
            <Form.Control
              name="smalldescription"
              defaultValue={bab.smalldescription}
              ref={register}
            />
            {errors.smalldescription && (
              <FormError>{errors.smalldescription.message}</FormError>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Bab description 1: </Form.Label>
            <Form.Control
              name="description1"
              defaultValue={bab.description1}
              ref={register}
            />
            {errors.description1 && (
              <FormError>{errors.description1.message}</FormError>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Bab address: </Form.Label>
            <Form.Control
              name="description3"
              defaultValue={bab.description3}
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
              defaultValue={bab.prices}
              ref={register}
            />
            {errors.prices && <FormError>{errors.prices.message}</FormError>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Image 1 </Form.Label>
            <Form.Control name="img1" defaultValue={bab.img1} ref={register} />
            {errors.img1 && <FormError>{errors.img1.message}</FormError>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Image 2 </Form.Label>
            <Form.Control name="img2" defaultValue={bab.img2} ref={register} />
            {errors.img2 && <FormError>{errors.img2.message}</FormError>}
          </Form.Group>{" "}
          <Form.Group>
            <Form.Label>Image 3 </Form.Label>
            <Form.Control name="img3" defaultValue={bab.img3} ref={register} />
            {errors.img3 && <FormError>{errors.img3.message}</FormError>}
          </Form.Group>{" "}
          <Form.Group>
            <Form.Label>Image 4 </Form.Label>
            <Form.Control name="img4" defaultValue={bab.img4} ref={register} />
            {errors.img4 && <FormError>{errors.img4.message}</FormError>}
          </Form.Group>
          <button className={styles.button} type="submit">
            Update
          </button>
          <hr />
          <DeleteBabButton id={bab.id} name={bab.name} />
        </fieldset>
      </Form>
    </Container>
  );
}
