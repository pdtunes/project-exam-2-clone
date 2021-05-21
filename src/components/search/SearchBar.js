import { Typeahead } from "react-bootstrap-typeahead";
import Form from "react-bootstrap/Form";
import {
  BASE_URL,
  HOTELS_ENDPOINT,
  BAB_ENDPOINT,
  GUESTHOUSES_ENDPOINT,
} from "../../constants/api";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./SearchBar.module.css";

const endpoints = [
  fetch(`${BASE_URL}${HOTELS_ENDPOINT}`).then((response) => response.json()),
  fetch(`${BASE_URL}${BAB_ENDPOINT}`).then((response) => response.json()),
  fetch(`${BASE_URL}${GUESTHOUSES_ENDPOINT}`).then((response) =>
    response.json()
  ),
];

export default function SearchBar() {
  const [Selections, setSelections] = useState([]);
  const [accommodation, setPlaces] = useState([]);
  const [errorMsg, setErrormsg] = useState(null);
  const history = useHistory();

  useEffect(function () {
    async function fetchData() {
      try {
        const responses = await Promise.all(endpoints);
        setPlaces(await responses.flat());
      } catch (error) {
        setErrormsg(error.toString());
      }
    }
    fetchData();
  }, []);

  useEffect(
    function () {
      if (Selections.length) {
        switch (Selections[0].type) {
          case "hotel":
            history.push("hoteldetails/" + Selections[0].id);
            break;
          case "bab":
            history.push("babdetails/" + Selections[0].id);
            break;
          case "guesthouse":
            history.push("guesthousedetails/" + Selections[0].id);
            break;
        }
      }
    },
    [Selections]
  );
  return (
    <>
      <Form.Group className={styles.searchwrapper}>
        <Typeahead
          className={styles.searchbar}
          id="basic-typeahead-"
          labelKey="name"
          onChange={setSelections}
          options={accommodation}
          placeholder="Find accommodation"
          selected={Selections}
        />
      </Form.Group>
    </>
  );
}
