import { BASE_URL, BAB_ENDPOINT } from "../../../../constants/api";
import { useState, useEffect } from "react";
import { Card, Container, Carousel } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Bookings from "../../../booking/Bookings";
import styles from "./BabDetails.module.css";
import { GiWalk } from "react-icons/all";

export default function BabDetails() {
  const [bab, setBab] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrormsg] = useState(null);

  const { id } = useParams();

  useEffect(
    function () {
      async function fetchData() {
        try {
          const response = await fetch(`${BASE_URL}${BAB_ENDPOINT}/${id}`);
          if (response.ok) {
            const json = await response.json();
            setBab(json);
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
      <div key={bab.id}>
        <Container className={styles.container}>
          <Carousel className={styles.carousel}>
            <Carousel.Item className={styles.carouselitem}>
              <img className="d-block " src={bab.img1} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block " src={bab.img2} alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block " src={bab.img3} alt="Third slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block " src={bab.img4} alt="Third slide" />
            </Carousel.Item>
          </Carousel>
          <div className={styles.cardwrapper}>
            <div className={styles.infowrap}>
              <Card.Title>{bab.name}</Card.Title>
              <Card.Text>
                <b>{bab.smalldescription}</b>
              </Card.Text>
              <Card.Text>
                <b>Address: {bab.description3}</b>
              </Card.Text>
              <Card.Text className={styles.babinfo}>
                <b>
                  {" "}
                  About <i>{bab.name}</i>: <br />
                </b>{" "}
                {bab.description1}
              </Card.Text>
              <ul className={styles.areainfo}>
                <b>
                  {" "}
                  <GiWalk />
                  In the area
                </b>
                <li> {bab.list1}</li>
                <li> {bab.list2}</li>
                <li> {bab.list3}</li>
                <li> {bab.list4}</li>
                <li> {bab.list5}</li>
                <li> {bab.list6}</li>
                <li> {bab.list7}</li>
                <li> {bab.list8}</li>
              </ul>
            </div>

            <div className={styles.bookform}>
              <Bookings babid={bab.id} babname={bab.name} />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
