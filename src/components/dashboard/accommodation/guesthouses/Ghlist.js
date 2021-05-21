import { BASE_URL, GUESTHOUSES_ENDPOINT } from "../../../../constants/api";
import { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Ghlist.module.css";
import useLocalStorage from "../../../../hooks/useLocalStorage";

export default function Ghlist() {
  const [guesthouses, setGuesthouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrormsg] = useState(null);
  const [token] = useLocalStorage("jwt", null);

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch(`${BASE_URL}${GUESTHOUSES_ENDPOINT}`);
        if (response.ok) {
          const json = await response.json();
          setGuesthouses(json);
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
        <h3 className={styles.header}>Guesthouses</h3>
        <div className={styles.listwrap}>
          {guesthouses.map((guesthouse) => {
            return (
              <>
                <Link to={`guesthousedetails/${guesthouse.id}`}>
                  <div className={styles.cardstyle} key={guesthouse.id}>
                    <Card.Img variant="top" src={guesthouse.img1} />
                    <Card.Body>
                      <Card.Title className={styles.title}>
                        {guesthouse.name}
                      </Card.Title>
                      <Card.Text>{guesthouse.smalldescription}</Card.Text>
                      <Card.Text>
                        {" "}
                        <b>Prices from: {guesthouse.prices}NOK </b>
                      </Card.Text>
                      {token && (
                        <button className={styles.button}>
                          <Link to={`/editguesthouse/${guesthouse.id}`}>
                            Edit Hotel
                          </Link>
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
