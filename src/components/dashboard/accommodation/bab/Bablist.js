import { BASE_URL, BAB_ENDPOINT } from "../../../../constants/api";
import { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Bablist.module.css";
import useLocalStorage from "../../../../hooks/useLocalStorage";

export default function BabList() {
  const [babs, setBabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrormsg] = useState(null);
  const [token] = useLocalStorage("jwt", null);

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch(`${BASE_URL}${BAB_ENDPOINT}`);
        if (response.ok) {
          const json = await response.json();
          setBabs(json);
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
        <h3 className={styles.header}>Bed and breakfasts</h3>
        <div className={styles.listwrap}>
          {babs.map((bab) => {
            return (
              <>
                <Link to={`babdetails/${bab.id}`} key={bab.id}>
                  <div className={styles.cardstyle}>
                    <Card.Img variant="top" src={bab.img1} />
                    <Card.Body>
                      <Card.Title className={styles.title}>
                        {bab.name}
                      </Card.Title>
                      <Card.Text>{bab.smalldescription}</Card.Text>
                      <Card.Text>
                        {" "}
                        <b>Prices from: {bab.prices}NOK </b>
                      </Card.Text>
                      {token && (
                        <button className={styles.button}>
                          {" "}
                          <Link to={`/editbab/${bab.id}`}>Edit Hotel</Link>
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
