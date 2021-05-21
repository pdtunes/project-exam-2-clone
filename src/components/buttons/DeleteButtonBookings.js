import { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { BASE_URL, BOOKINGS_ENDPOINT } from "../../constants/api";
import styles from "./DeleteButton.module.css";

export default function DeleteButtonBookings({ id, lastname, firstname }) {
  const [error, setError] = useState(null);

  const http = useAxios();
  const history = useHistory();

  const bookingUrl = `${BASE_URL}${BOOKINGS_ENDPOINT}/${id}`;

  async function handleDelete() {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this booking ${lastname}, ${firstname}`
    );
    if (confirmDelete) {
      try {
        await http.delete(bookingUrl);
        history.go(0);
      } catch (error) {
        setError(error);
      }
    }
  }

  return (
    <button className={styles.button} type="button" onClick={handleDelete}>
      {error ? "Error" : "Delete"}
    </button>
  );
}

DeleteButtonBookings.propTypes = {
  id: PropTypes.number.isRequired,
  lastname: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
};
