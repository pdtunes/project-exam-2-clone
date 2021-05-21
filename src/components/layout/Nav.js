import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { Container, Navbar, Nav } from "react-bootstrap";
import styles from "./Nav.module.css";
import { FiLogIn } from "react-icons/all";

function Navigaton() {
  const [auth, setAuth] = useContext(AuthContext);
  const history = useHistory();
  function logout() {
    setAuth(null);
    history.push("/");
  }
  return (
    <Container className="main">
      <Navbar className={styles.navbar} expand="lg">
        <Navbar.Brand href="/">
          <img
            className="logo"
            src="https://res.cloudinary.com/dgeiq2r6e/image/upload/v1618224103/holidaze/logob_c0orww.png"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className={styles.link} to="/">
              Home
            </Link>
            <Link className={styles.link} to="/accommodation">
              Accommodation
            </Link>
            <Link className={styles.link} to="/contact">
              Contact
            </Link>
            <Link className={styles.link} to="/about">
              About
            </Link>
          </Nav>
          {auth ? (
            <>
              <Link className={styles.link} to="/admin">
                Admin
              </Link>{" "}
              <button className={styles.button} onClick={logout}>
                Logout <FiLogIn />
              </button>
            </>
          ) : (
            <Link to="/login">
              Login <FiLogIn />
            </Link>
          )}
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default Navigaton;
