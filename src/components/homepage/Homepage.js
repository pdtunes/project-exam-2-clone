import { Container, Card, CardDeck } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import SearchBar from "../search/SearchBar";

export default function HomePage() {
  return (
    <>
      <div className={styles.heroimage}>
        <img
          src="https://res.cloudinary.com/dgeiq2r6e/image/upload/v1618142635/holidaze/jumbohome_s5ye4d.jpg"
          alt="Hero"
        />
        <div className={styles.herotext}>
          <h1>
            Have your{" "}
            <img
              className={styles.logo}
              src="https://res.cloudinary.com/dgeiq2r6e/image/upload/v1618501967/holidaze/logow_d1atxl.png"
              alt="Logo"
            />{" "}
            in Bergen
          </h1>
        </div>
      </div>

      <Container className="main">
        <SearchBar />
        <h1 className={styles.header}>Accommodation</h1>
        <div className={styles.placesContainer}>
          <CardDeck>
            <div className={styles.homepageCard}>
              <Link to="/hotels">
                <Card.Img
                  variant="top"
                  src="https://res.cloudinary.com/dgeiq2r6e/image/upload/v1618144980/holidaze/hotel_t7auue.png"
                />
                <Card.Body>
                  <Card.Title>Hotels</Card.Title>
                </Card.Body>
              </Link>
            </div>

            <div className={styles.homepageCard}>
              <Link to="/guesthouses">
                <Card.Img
                  variant="top"
                  src="https://res.cloudinary.com/dgeiq2r6e/image/upload/v1618144980/holidaze/house_ickwip.png"
                />
                <Card.Body>
                  <Card.Title>Guesthouses</Card.Title>
                </Card.Body>
              </Link>
            </div>
            <div className={styles.homepageCard}>
              <Link to="/bab">
                <Card.Img
                  variant="top"
                  src="https://res.cloudinary.com/dgeiq2r6e/image/upload/v1618144980/holidaze/bb_tprmhh.png"
                />
                <Card.Body>
                  <Card.Title>Bed and breakfast</Card.Title>
                </Card.Body>
              </Link>
            </div>
          </CardDeck>
        </div>
      </Container>
    </>
  );
}
