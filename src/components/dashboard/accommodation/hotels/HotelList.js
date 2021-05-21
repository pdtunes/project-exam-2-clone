import { BASE_URL, HOTELS_ENDPOINT } from "../../../../constants/api";
import { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./HotelList.module.css";
import useLocalStorage from "../../../../hooks/useLocalStorage";

export default function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrormsg] = useState(null);
  const [token] = useLocalStorage("jwt", null);

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch(`${BASE_URL}${HOTELS_ENDPOINT}`);
        if (response.ok) {
          const json = await response.json();
          setHotels(json);
        }
      } catch (error) {
        setErrormsg(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMsg) {
    return <div>You have an error: {errorMsg}</div>;
  }

  return (
    <>
      <Container className={styles.box}>
        <h3 className={styles.header}>Hotels</h3>
        <div className={styles.listwrap}>
          {hotels.map((hotel) => {
            return (
              <>
                <Link to={`hoteldetails/${hotel.id}`} key={hotel.id}>
                  <div className={styles.cardstyle}>
                    <Card.Img variant="top" src={hotel.img1} />
                    <Card.Body>
                      <Card.Title className={styles.title}>
                        {hotel.name}
                      </Card.Title>
                      <Card.Text>{hotel.smalldescription}</Card.Text>
                      <Card.Text>
                        {" "}
                        <b>Prices from: {hotel.prices}NOK </b>
                      </Card.Text>
                      {token && (
                        <button className={styles.button}>
                          <Link to={`/edithotel/${hotel.id}`}>Edit Hotel</Link>
                        </button>
                      )}
                    </Card.Body>
                  </div>
                </Link>
              </>
            );
          })}
        </div>
      </Container>
    </>
  );
}
