import { Container } from "react-bootstrap";

import styles from "./About.module.css";

export default function About() {
  return (
    <Container className={styles.containerwrap}>
      <div className={styles.confirmationwrap}>
        <h1>Thank you for visiting this page</h1>
        <p>
          This page is a my delivery for this years school exam. All of the
          information text and images is owned by{" "}
          <a target="_blank" href="https://hotels.com">
            Hotels.com.
          </a>{" "}
          I have just borrowed it for this exam.
          <br /> This webpage is created by Peder Steene{" "}
          <a target="_blank" href="https://github.com/pdtunes">
            - Github
          </a>
        </p>
      </div>
    </Container>
  );
}
