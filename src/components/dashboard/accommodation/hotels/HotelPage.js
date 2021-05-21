import { Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchBar from "../../../search/SearchBar";
import HotelList from "./HotelList";
import styles from "./HotelPage.module.css";

export default function HotelPage() {
  return (
    <>
      <Container className="main">
        <SearchBar />
        <div className={styles.placesContainer}>
          <h1 className={styles.header}>Accommodation</h1>
          <div className={styles.deckwrap}>
            <div className={styles.placescard}>
              <Link to="/hotels">
                <Card.Img
                  variant="top"
                  src="https://res.cloudinary.com/dgeiq2r6e/image/upload/v1618144980/holidaze/hotel_t7auue.png"
                />
                <div className={styles.box}>
                  <div className={styles.cardtitle}>Hotels</div>
                </div>
              </Link>
            </div>

            <div className={styles.placescard}>
              <Link to="/guesthouses">
                <Card.Img
                  variant="top"
                  src="https://res.cloudinary.com/dgeiq2r6e/image/upload/v1618144980/holidaze/house_ickwip.png"
                />
                <div className={styles.box}>
                  <div className={styles.cardtitle}>Guesthouses</div>
                </div>
              </Link>
            </div>
            <div className={styles.placescard}>
              <Link to="/bab">
                <Card.Img
                  variant="top"
                  src="https://res.cloudinary.com/dgeiq2r6e/image/upload/v1618144980/holidaze/bb_tprmhh.png"
                />
                <div className={styles.box}>
                  <div className={styles.cardtitle}>Bed and breakfast</div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <HotelList />
      </Container>
    </>
  );
}
