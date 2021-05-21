import { BASE_URL, HOTELS_ENDPOINT } from "../../../../constants/api";
import { useState, useEffect } from "react";
import { Card, Container, Carousel } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Bookings from "../../../booking/Bookings";
import styles from "./HotelDetails.module.css";
import { GiWalk } from "react-icons/all";

export default function HotelDetails() {
  const [hotel, setHotel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrormsg] = useState(null);

  const { id } = useParams();

  useEffect(
    function () {
      async function fetchData() {
        try {
          const response = await fetch(`${BASE_URL}${HOTELS_ENDPOINT}/${id}`);
          if (response.ok) {
            const json = await response.json();
            setHotel(json);
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
      <div key={hotel.id}>
        <Container className={styles.container}>
          <Carousel className={styles.carousel}>
            <Carousel.Item className={styles.carouselitem}>
              <img className="d-block " src={hotel.img1} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block " src={hotel.img2} alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block " src={hotel.img3} alt="Third slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block " src={hotel.img4} alt="Third slide" />
            </Carousel.Item>
          </Carousel>
          <div className={styles.cardwrapper}>
            <div className={styles.infowrap}>
              <Card.Title>{hotel.name}</Card.Title>
              <Card.Text>
                <b>{hotel.smalldescription}</b>
              </Card.Text>
              <Card.Text>
                <b>Address: {hotel.description3}</b>
              </Card.Text>
              <Card.Text className={styles.hotelinfo}>
                <b>
                  {" "}
                  About <i>{hotel.name}</i>:
                </b>{" "}
                <br />
                {hotel.description1}
              </Card.Text>
              <ul className={styles.areainfo}>
                <Card.Text></Card.Text>
                <b>
                  <GiWalk />
                  In the area
                </b>
                <li> {hotel.list1}</li>
                <li> {hotel.list2}</li>
                <li> {hotel.list3}</li>
                <li> {hotel.list4}</li>
                <li> {hotel.list5}</li>
                <li> {hotel.list6}</li>
                <li> {hotel.list7}</li>
                <li> {hotel.list8}</li>
              </ul>
            </div>

            <div className={styles.bookform}>
              <Bookings hotelid={hotel.id} hotelname={hotel.name} />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
