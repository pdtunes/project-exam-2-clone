import { useState, useEffect } from "react";
import { BASE_URL, CONTACTS_ENDPOINT } from "../../constants/api";
import useAxios from "../../hooks/useAxios";
import { Container } from "react-bootstrap";
import DeleteButtonContacts from "../buttons/DeleteButtonContacts";
import styles from "./ContactList.module.css";

export default function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const http = useAxios();

  useEffect(() => {
    async function getAllContacts() {
      try {
        const response = await http.get(`${BASE_URL}${CONTACTS_ENDPOINT}`);
        setContacts(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    getAllContacts();
  }, []);

  if (loading) return <div>Loading..</div>;
  if (error) return <div>an error happened</div>;

  return (
    <>
      <Container className="main">
        <h1> Messages </h1>
        <div className={styles.contactswrap}>
          {contacts.map((contact) => {
            return (
              <div
                className={styles.contactswrap}
                className="table-responsive"
                key={contact.id}
              >
                <table className="table table-striped">
                  <tbody>
                    <tr className={styles.contactswrap}>
                      <td className={styles.tdbox}>
                        <b>Name:</b> {contact.lastname}, {contact.firstname}
                      </td>

                      <td className={styles.tdboxmail}>
                        <b>Email:</b> <br />
                        {contact.email}
                      </td>
                      <td className={styles.tdbox}>
                        <b>Telephone:</b> {contact.telephone}
                      </td>

                      <td className={styles.tdboxmessage}>
                        <b>Message:</b> <br /> {contact.message}
                      </td>
                      <td className={styles.tdbox}>
                        <DeleteButtonContacts
                          id={contact.id}
                          lastname={contact.lastname}
                          firstname={contact.firstname}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
}
