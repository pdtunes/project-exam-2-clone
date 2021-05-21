import { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { BASE_URL, HOTELS_ENDPOINT } from "../../constants/api";
import styles from "./Delete.module.css";

export default function DeleteHotelButton({ id, name }) {
  const [error, setError] = useState(null);

  const http = useAxios();
  const history = useHistory();

  const url = `${BASE_URL}${HOTELS_ENDPOINT}/${id}`;

  async function handleDelete() {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this hotel: ${name}`
    );
    if (confirmDelete) {
      try {
        await http.delete(url);
        history.push("/hotels");
      } catch (error) {
        setError(error);
      }
    }
  }

  return (
    <button className={styles.delbutton} type="button" onClick={handleDelete}>
      {error ? "Error" : "Delete Hotel"}
    </button>
  );
}

DeleteHotelButton.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
