import BookingsList from "./BookingList";
import ContactsList from "./ContactList";
import styles from "./Admin.module.css";
import { Container, Dropdown } from "react-bootstrap";

export default function Admin() {
  return (
    <>
      <Container className="main">
        <div className={styles.adminwrap}>
          <h3>Admin</h3>
          <Dropdown>
            <Dropdown.Toggle className={styles.button} id="dropdown-basic">
              Add new
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/addhotels">Hotel</Dropdown.Item>
              <Dropdown.Item href="/addghs">Guesthouse</Dropdown.Item>
              <Dropdown.Item href="/addbabs">Bed and breakfast</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={styles.bookingswrapper}>
          <BookingsList />
        </div>
        <div className={styles.contactwrapper}>
          <ContactsList />
        </div>
      </Container>
    </>
  );
}
