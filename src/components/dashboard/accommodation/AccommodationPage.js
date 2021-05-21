import { Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchBar from "../../search/SearchBar";
import styles from "./AccommodationPage.module.css";

export default function AccommodationPage() {
  return (
    <>
      <Container className="main">
        <SearchBar />

        <div className="placesContainer">
          <h1 className={styles.header}>Accommodation</h1>
          <div className={styles.deckwrap}>
            <div className={styles.placescard}>
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

            <div className={styles.placescard}>
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
            <div className={styles.placescard}>
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
          </div>
        </div>
      </Container>
    </>
  );
}
