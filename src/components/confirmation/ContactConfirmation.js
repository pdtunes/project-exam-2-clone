import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Confirmation.module.css";

export default function ContactConfirmation() {
  return (
    <Container className="main">
      <div className={styles.confirmationwrap}>
        <h1>Thank you for contacting us</h1>
        <h3>We will reply as soon as possible.</h3>
        <h3>Have a great day</h3>

        <h3>
          {" "}
          <b>
            <Link to="/">Click here to go to homepage</Link>
          </b>
        </h3>
      </div>
    </Container>
  );
}
