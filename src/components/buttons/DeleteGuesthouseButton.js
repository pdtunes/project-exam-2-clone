import { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { BASE_URL, GUESTHOUSES_ENDPOINT } from "../../constants/api";
import styles from "./Delete.module.css";

export default function DeleteGuesthouseButton({ id, name }) {
  const [error, setError] = useState(null);

  const http = useAxios();
  const history = useHistory();

  const url = `${BASE_URL}${GUESTHOUSES_ENDPOINT}/${id}`;

  async function handleDelete() {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this guesthouse: ${name}`
    );
    if (confirmDelete) {
      try {
        await http.delete(url);
        history.push("/guesthouses");
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }
  }

  return (
    <button className={styles.delbutton} type="button" onClick={handleDelete}>
      {error ? "Error" : "Delete Guesthouse"}
    </button>
  );
}

DeleteGuesthouseButton.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
