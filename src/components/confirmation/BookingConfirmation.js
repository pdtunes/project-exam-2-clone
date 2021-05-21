import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Confirmation.module.css";

export default function BookingConfirmation() {
  return (
    <Container className="main">
      <div className={styles.confirmationwrap}>
        <h1>Thank you for your booking</h1>
        <p>
          If you have any questions you can contact us by{" "}
          <Link to="/contact">clicking here</Link>
        </p>

        <h3>
          <Link to="/">Click here to go to homepage</Link>
        </h3>
      </div>
    </Container>
  );
}
