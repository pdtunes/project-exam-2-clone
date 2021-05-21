import { BASE_URL, GUESTHOUSES_ENDPOINT } from "../../../../constants/api";
import { useState, useEffect } from "react";
import { Card, Container, Carousel } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Bookings from "../../../booking/Bookings";
import styles from "./GhDetails.module.css";
import { GiWalk } from "react-icons/all";

export default function GuesthouseDetails() {
  const [guesthouse, setGuesthouse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrormsg] = useState(null);

  const { id } = useParams();

  useEffect(
    function () {
      async function fetchData() {
        try {
          const response = await fetch(
            `${BASE_URL}${GUESTHOUSES_ENDPOINT}/${id}`
          );
          if (response.ok) {
            const json = await response.json();
            setGuesthouse(json);
          }
        } catch (error) {
          setErrormsg(error.toString());
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    },
    [id]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMsg) {
    return <div>You have an error: {errorMsg}</div>;
  }

  return (
    <>
      <div key={guesthouse.id}>
        <Container className={styles.container}>
          <Carousel className={styles.carousel}>
            <Carousel.Item className={styles.carouselitem}>
              <img
                className="d-block "
                src={guesthouse.img1}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block "
                src={guesthouse.img2}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block "
                src={guesthouse.img3}
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block "
                src={guesthouse.img4}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
          <div className={styles.cardwrapper}>
            <div className={styles.infowrap}>
              <Card.Title>{guesthouse.name}</Card.Title>
              <Card.Text>
                <b>{guesthouse.smalldescription}</b>
              </Card.Text>
              <Card.Text>
                <b>Address: {guesthouse.description3}</b>
              </Card.Text>
              <Card.Text className={styles.guesthouseinfo}>
                <b>
                  {" "}
                  About <i>{guesthouse.name}: </i> <br />
                </b>{" "}
                {guesthouse.description1}
              </Card.Text>
              <ul className={styles.areainfo}>
                <b>
                  <GiWalk /> In the area
                </b>
                <li> {guesthouse.list1}</li>
                <li> {guesthouse.list2}</li>
                <li> {guesthouse.list3}</li>
                <li> {guesthouse.list4}</li>
                <li> {guesthouse.list5}</li>
                <li> {guesthouse.list6}</li>
                <li> {guesthouse.list7}</li>
                <li> {guesthouse.list8}</li>
              </ul>
            </div>

            <div className={styles.bookform}>
              <Bookings ghid={guesthouse.id} ghname={guesthouse.name} />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
