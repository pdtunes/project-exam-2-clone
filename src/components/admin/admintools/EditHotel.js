import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../common/FormError";
import useAxios from "../../../hooks/useAxios";
import { Container, Form } from "react-bootstrap";
import { BASE_URL, HOTELS_ENDPOINT } from "../../../constants/api";
import { editSchema } from "../../../schemas/editSchema";
import styles from "./Edit.module.css";
import DeleteHotelButton from "../../buttons/DeleteHotelButton";

export default function EditHotel() {
  const [hotel, setHotel] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [fetchingHotel, setFetchingHotel] = useState(true);
  const [updatingHotel, setUpdatingHotel] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(editSchema),
  });

  const http = useAxios();
  const { id } = useParams();
  const url = `${BASE_URL}${HOTELS_ENDPOINT}/${id}`;

  useEffect(() => {
    async function getHotel() {
      try {
        const response = await http.get(url);
        setHotel(response.data);
      } catch (error) {
        setFetchError(error.toString());
      } finally {
        setFetchingHotel(false);
      }
    }
    getHotel();
  }, [url, http]);

  async function onSubmit(data) {
    setUpdatingHotel(true);
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
      setUpdatingHotel();
    }
  }

  if (fetchingHotel) return <div>Loading...</div>;

  if (fetchError) return <div>Error loading the hotel</div>;

  return (
    <Container className={styles.wrapper}>
      <h3>{hotel.name}</h3>
      <Form onSubmit={handleSubmit((data) => onSubmit(data))}>
        {updated && <div className="success">The hotel was updated</div>}

        {updateError && <FormError>{updateError}</FormError>}
        <div>
          <img src={hotel.image_url} width="100%" alt={hotel.title} />
        </div>
        <fieldset disabled={updatingHotel}>
          <Form.Group>
            <Form.Label>Hotel name: </Form.Label>
            <Form.Control
              name="name"
              defaultValue={hotel.name}
              ref={register}
            />
            {errors.name && <FormError>{errors.name.message}</FormError>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Hotel shortdescription: </Form.Label>
            <Form.Control
              name="smalldescription"
              defaultValue={hotel.smalldescription}
              ref={register}
            />
            {errors.smalldescription && (
              <FormError>{errors.smalldescription.message}</FormError>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Hotel description 1: </Form.Label>
            <Form.Control
              name="description1"
              defaultValue={hotel.description1}
              ref={register}
            />
            {errors.description1 && (
              <FormError>{errors.description1.message}</FormError>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Hotel address: </Form.Label>
            <Form.Control
              name="description3"
              defaultValue={hotel.description3}
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
              defaultValue={hotel.prices}
              ref={register}
            />
            {errors.prices && <FormError>{errors.prices.message}</FormError>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Image 1 </Form.Label>
            <Form.Control
              name="img1"
              defaultValue={hotel.img1}
              ref={register}
            />
            {errors.img1 && <FormError>{errors.img1.message}</FormError>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Image 2 </Form.Label>
            <Form.Control
              name="img2"
              defaultValue={hotel.img2}
              ref={register}
            />
            {errors.img2 && <FormError>{errors.img2.message}</FormError>}
          </Form.Group>{" "}
          <Form.Group>
            <Form.Label>Image 3 </Form.Label>
            <Form.Control
              name="img3"
              defaultValue={hotel.img3}
              ref={register}
            />
            {errors.img3 && <FormError>{errors.img3.message}</FormError>}
          </Form.Group>{" "}
          <Form.Group>
            <Form.Label>Image 4 </Form.Label>
            <Form.Control
              name="img4"
              defaultValue={hotel.img4}
              ref={register}
            />
            {errors.img4 && <FormError>{errors.img4.message}</FormError>}
          </Form.Group>
          <button className={styles.button} type="submit">
            Update
          </button>
          <hr />
          <DeleteHotelButton id={hotel.id} name={hotel.name} />
        </fieldset>
      </Form>
    </Container>
  );
}
