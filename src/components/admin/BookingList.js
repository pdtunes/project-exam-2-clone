import { useState, useEffect } from "react";
import { BASE_URL, BOOKINGS_ENDPOINT } from "../../constants/api";
import useAxios from "../../hooks/useAxios";
import { Container } from "react-bootstrap";
import DeleteButtonBookings from "../buttons/DeleteButtonBookings";
import styles from "./BookingList.module.css";
import moment from "moment";

export default function BookingsList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const http = useAxios();

  useEffect(() => {
    async function getAllBookings() {
      try {
        const response = await http.get(`${BASE_URL}${BOOKINGS_ENDPOINT}`);
        setBookings(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    getAllBookings();
  }, []);

  if (loading) return <div>Loading..</div>;
  if (error) return <div>an error happened</div>;

  return (
    <>
      <Container className="main">
        <h1> Bookings </h1>
        <div className={styles.bookingswrap}>
          {bookings.map((booking) => {
            const fromDate = moment(booking.datefrom).format("DD MM YYYY");
            const toDate = moment(booking.dateto).format("DD MM YYYY");
            return (
              <div
                className={styles.bookingswrap}
                className="table-responsive"
                key={booking.id}
              >
                <b>
                  Booking: {booking.hotelname}
                  {booking.babname}
                  {booking.ghname}
                </b>
                <table className="table table-striped">
                  <tbody>
                    <tr className={styles.bookingswrap}>
                      <td className={styles.tdbox}>
                        <b>Name:</b> {booking.lastname}, {booking.firstname}
                      </td>

                      <td className={styles.tdboxmail}>
                        <b>Email:</b> <br />
                        {booking.email}
                      </td>
                      <td className={styles.tdbox}>
                        <b>Telephone:</b> {booking.telephone}
                      </td>
                      <td className={styles.tdbox}>
                        <b>
                          Period: <br />{" "}
                        </b>{" "}
                        {fromDate} {toDate}
                      </td>

                      <td className={styles.tdbox}>
                        <b>
                          Persons:
                          <br />
                        </b>{" "}
                        {booking.persons}
                      </td>
                      <td className={styles.tdboxmessage}>
                        <b>Message:</b> <br /> {booking.message}
                      </td>
                      <td className={styles.tdbox}>
                        <DeleteButtonBookings
                          id={booking.id}
                          lastname={booking.lastname}
                          firstname={booking.firstname}
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
